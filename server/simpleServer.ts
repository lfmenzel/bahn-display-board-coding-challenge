import express from "express";
import axios from "axios";
import cors from "cors";
import {filterDates, prepareTrainTypes} from "./helper";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const targetServerHOST = process.env.BAHN_TARGET_SERVER_HOST || "http://localhost";
const targetServerPort = process.env.BAHN_TARGET_SERVER_PORT || "";
const targetServerURL = targetServerPort ? `${targetServerHOST}:${targetServerPort}` : targetServerHOST;

const simpleServerPort = process.env.BAHN_SIMPLE_SERVER_PORT || 3000;

const clientHOST = process.env.BAHN_CLIENT_HOST || "http://localhost";
const clientPort = process.env.BAHN_CLIENT_PORT || 4200;
const clientURL = `${clientHOST}:${clientPort}`;

const corsOptions = {
    origin: clientURL,
    methods: "GET,POST",
};

app.use(cors(corsOptions));

app.get("/api/station/autocomplete", async (req, res) => {
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

app.get("/api/station/:ortExtId/departures", async (req, res) => {
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

app.get(`/api/station/:ortExtId/arrivals`, async (req, res) => {
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

app.listen(simpleServerPort, () => console.log(`Server is running on port ${simpleServerPort}\nTarget URL is ${targetServerURL}\nClient should run at ${clientURL}`));
