import express from "express";
import axios from "axios";
import cors from "cors";
import {filterDates, prepareTrainTypes} from "./helper";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

dotenv.config();

const app = express();

const targetServerHOST = process.env.BAHN_TARGET_SERVER_HOST || "http://localhost";
const targetServerPort = process.env.BAHN_TARGET_SERVER_PORT || "";
const targetServerURL = targetServerPort ? `${targetServerHOST}:${targetServerPort}` : targetServerHOST;

const simpleServerPort = process.env.BAHN_SIMPLE_SERVER_PORT || 3000;

const clientHOST = process.env.BAHN_CLIENT_HOST || "http://localhost";
const clientPort = process.env.BAHN_CLIENT_PORT || 4200;
const clientURL = `${clientHOST}:${clientPort}`;

const secretKey = process.env.SECRET_KEY || "very_secret_key";
const startPasswords =
    process.env.START_PASSWORDS || ["very_secret_start_password"];
const isLocal = process.env.IS_LOCAL || true;

const corsOptions = {
    origin: clientURL,
    methods: "GET,POST",
};

let users = [];

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
        //TODO just for testing, use a database
        users = [];
        // TODO remove Start Password after using it
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const hashedPassword = await bcrypt.hash(password, 8);
        users.push({ username, password: hashedPassword });
        res.status(201).send("User created");
    },
);

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign({ userId: user.username }, secretKey, {
        expiresIn: "1h",
    });
    res.status(200).send({ token });
});

app.get("/api/station/autocomplete", authToken, async (req, res) => {
    try {
        const query = req.query.query
        const limit = req.query.limit
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
                            return filterDates(entry.zeit, entry.ezZeit, String(limit));
                        },
                    )
                });
            } else {
                res.json({ entries: [] });
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
                            return filterDates(entry.zeit, entry.ezZeit, String(limit));
                        },
                    )
                });
            } else {
                res.json({ entries: [] });
            }
        }
    } catch (error) {
        res
            .status(500)
            .json({error: `Failed to fetch data from ${targetServerURL}`});
    }
});

app.listen(simpleServerPort, () => console.log(`Simple Server is running on port ${simpleServerPort}\nTarget URL is ${targetServerURL}\nClient should run at ${clientURL}`));
