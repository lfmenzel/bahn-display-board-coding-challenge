import express from "express";
import axios from "axios";
import cors from "cors";
import {filterDates, prepareTrainTypes} from "./helper";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
dotenv.config();

const app = express();

const targetServerHOST = process.env.BAHN_TARGET_SERVER_HOST || "http://localhost";
const targetServerPort = process.env.BAHN_TARGET_SERVER_PORT || "";
const targetServerURL = targetServerPort ? `${targetServerHOST}:${targetServerPort}` : targetServerHOST;

const simpleServerPort = process.env.BAHN_SIMPLE_SERVER_PORT || 3000;

const clientHOST = process.env.BAHN_CLIENT_HOST || "http://localhost";
const clientPort = process.env.BAHN_CLIENT_PORT || 4200;
const clientURL = `${clientHOST}:${clientPort}`;

const secretKey = process.env.SECRET_KEY || "";
const startPasswords = process.env.START_PASSWORDS || [""];
const isLocal = process.env.IS_LOCAL || false;

const corsOptions = {
    origin: clientURL,
    methods: "GET,POST",
};

const usersDB = new Low(new JSONFile<[]>('users.json'), [])
await usersDB.read()

app.use(cors(corsOptions));
app.use(express.json());

const authToken = (req, res, next) => {
    if (!isLocal) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) return res.status(401).send("Token required");
        jwt.verify(token, secretKey, (err, user) => {
            if (err) return res.status(403).send("Invalid or expired token");
            req.user = user;
            next();
        });
    } else {
        next();
    }
};

app.use((req,res,next) =>{
    // TODO logger middleware
    // console.log(req.method,req.hostname, req.path, req.query);
    next();
});

app.post(
    "/api/signup",
    [
        body("username")
            .isLength({ min: 3 })
            .withMessage("Enter a valid username at least 3 characters long"),
        body("password")
            .isLength({ min: 3 })
            .withMessage("Password must be at least 3 characters long"),
        body("startPassword")
            .isLength({ min: 3 })
            .withMessage("StartPassword must be at least 3 characters long"),
    ],
    async (req, res) => {
        if (!req.body.startPassword || !startPasswords.includes(req.body.startPassword)) {
            return res.status(401).send("Invalid or missing Start Password");
        }
        const { username, password } = req.body;
        // TODO remove Start Password after using it
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const hashedPassword = await bcrypt.hash(password, 8);
        let users = usersDB.data
        users = users.filter(
            (user) => user.username != username,
        )
        users.push({ username, password: hashedPassword, statistics: {logins: 0, loginErrors: 0, stationSearches: 0, arrivalDisplays: 0, departuresDisplays: 0}, creationDate: new Date(), lastActiveDate: new Date() });
        usersDB.data = users;
        await usersDB.write()
        res.status(201).send("User created");
    },
);

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = usersDB.data.find((user) => user.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).send("Invalid credentials");
        if (user) {
            user.statistics.loginErrors += 1
            user.lastActiveDate = new Date()
            await usersDB.write()
        }
    } else {
        const token = jwt.sign({ userId: user.username }, secretKey, {
            expiresIn: "1h",
        });
        res.status(200).send({ token });
        if (user) {
            user.statistics.logins += 1
            user.lastActiveDate = new Date()
            await usersDB.write()
        }
    }
});

app.get("/api/station/autocomplete", authToken, async (req, res) => {
    try {
        const query = req.query.query
        const limit = req.query.limit
        const username = req.query.username
        if (!query || !limit) {
            res
                .status(500)
                .json({error: `Missing required query parameters: query, limit`});
        } else {
            const response = await axios.get(
                `${targetServerURL}/web/api/reiseloesung/orte?suchbegriff=${query}&typ=ALL&limit=${limit}`,
            );
            res.json(response.data);
        }

        const user = usersDB.data.find((user) => user.username === username);
        if (user) {
            user.statistics.stationSearches += 1
            user.lastActiveDate = new Date()
            await usersDB.write()
        }
    } catch (error) {
        res
            .status(500)
            .json({error: `Failed to fetch data from ${targetServerURL}`});
    }
});

app.get("/api/station/:ortExtId/departures", authToken, async (req, res) => {
    try {
        const ortExtId = req.params.ortExtId
        const datum = req.query.datum
        const zeit = req.query.zeit
        const limit = req.query.limit || "15"
        const vehicleType = prepareTrainTypes(String(req.query.vehicleType))
        const username = req.query.username

        if (!datum || !zeit) {
            res
                .status(500)
                .json({error: `Missing required query parameters: datum, zeit`});
        } else {
            const response = await axios.get(
                `${targetServerURL}/web/api/reiseloesung/abfahrten?datum=${datum}&zeit=${zeit}&ortExtId=${ortExtId}&mitVias=true&maxVias=8${vehicleType}`,
            );

            if (response.data?.entries?.length > 0) {
                res.json({ entries: response.data.entries
                    .filter(
                        (entry: { zeit: string; ezZeit: string }) => {
                            return filterDates(entry.zeit, entry.ezZeit, String(limit), String(datum), String(zeit));
                        },
                    )
                });
            } else {
                res.json({ entries: [] });
            }

            const user = usersDB.data.find((user) => user.username === username);
            if (user) {
                user.statistics.departuresDisplays += 1
                user.lastActiveDate = new Date()
                await usersDB.write()
            }
        }
    } catch (error) {
        res
            .status(500)
            .json({error: `Failed to fetch data from ${targetServerURL}`});
    }
});

app.get(`/api/station/:ortExtId/arrivals`, authToken, async (req, res) => {
    try {
        const ortExtId = req.params.ortExtId
        const datum = req.query.datum
        const zeit = req.query.zeit
        const limit = req.query.limit || "15"
        const vehicleType = prepareTrainTypes(String(req.query.vehicleType))
        const username = req.query.username
        if (!datum || !zeit) {
            res
                .status(500)
                .json({error: `Missing required query parameters: datum, zeit`});
        } else {
            const response = await axios.get(
                `${targetServerURL}/web/api/reiseloesung/ankuenfte?datum=${datum}&zeit=${zeit}&ortExtId=${ortExtId}&mitVias=true&maxVias=8${vehicleType}`,
            );
            if (response.data?.entries?.length > 0) {
                res.json({ entries: response.data.entries
                    .filter(
                        (entry: { zeit: string; ezZeit: string }) => {
                            return filterDates(entry.zeit, entry.ezZeit, String(limit), String(datum), String(zeit));
                        },
                    )
                });
            } else {
                res.json({ entries: [] });
            }
        }

        const user = usersDB.data.find((user) => user.username === username);
        if (user) {
            user.statistics.arrivalDisplays += 1
            user.lastActiveDate = new Date()
            await usersDB.write()
        }
    } catch (error) {
        res
            .status(500)
            .json({error: `Failed to fetch data from ${targetServerURL}`});
    }
});

app.get(`/api/statistics`, authToken, async (req, res) => {
    try {
        const users = usersDB.data.map(async (user) => {
            const userHash = await bcrypt.hash(user.username, 8)
            return {
                username: userHash,
                creationDate: user.creationDate,
                lastActiveDate: user.lastActiveDate,
                logins: user.statistics.logins,
                loginErrors: user.statistics.loginErrors,
                stationSearches: user.statistics.stationSearches,
                arrivalDisplays: user.statistics.arrivalDisplays,
                departuresDisplays: user.statistics.departuresDisplays
            }
        })
        res.json({ users: await Promise.all(users)});
    } catch (error) {
        res
            .status(500)
            .json({error: `Failed to fetch data from ${targetServerURL}`});
    }
});

app.listen(simpleServerPort, () => console.log(`Simple Server is running on port ${simpleServerPort}\nTarget URL is ${targetServerURL}\nClient should run at ${clientURL}`));
