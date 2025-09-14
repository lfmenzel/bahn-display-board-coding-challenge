import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "db-vendo-client"
import {profile as dbweg} from 'db-vendo-client/p/dbweb'
import {convertProduktGattung, prepareTrainTypes} from "./helper";

const app = express();

dotenv.config();

const vendoServerHost = process.env.BAHN_VENDO_SERVER_Host || "http://localhost";
const vendoServerPort = process.env.BAHN_VENDO_SERVER_PORT || 3003;
const vendoServerURL = `${vendoServerHost}:${vendoServerPort}`;

const clientHOST = process.env.BAHN_CLIENT_HOST || "http://localhost";
const clientPort = process.env.BAHN_CLIENT_PORT || 4200;
const clientURL = `${clientHOST}:${clientPort}`;

const corsOptions = {
    origin: clientURL,
    methods: "GET,POST",
};

const vendo = createClient(dbweg, 'uaTest');

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
            const locations = await vendo.locations(String(query), {
                results: Number(limit),
            })
            const locationsMapped = locations.map((location: any) => {
                return {
                    extId: location.id,
                    lat: location.location.latitude,
                    lon: location.location.longitude,
                    name: location.name,
                }
            })
            res
                .status(200)
                .json(locationsMapped);
        }
    } catch (error) {
        res
            .status(500)
            .json({error: `Failed to fetch data`});
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
            const { departures } = await vendo.departures(String(ortExtId), {
                duration: Number(limit),
                remarks: true,
                when: "2025-09-14T02:01:00+02:00",
                includeRelatedStations: true,
                stopovers: true,
            })
            const departuresMapped = departures.map((departure: any) => {
                return {
                    zeit: departure.when,
                    ezZeit: departure.plannedWhen,
                    gleis: departure.platform,
                    ezGleis: departure.plannedPlatform,
                    ueber: departure.nextStopovers.map((stopover: any) => {return stopover.stop.name}),
                    meldungen: departure.remarks,
                    verkehrmittel: {
                        name: departure.line.name,
                        produktGattung: convertProduktGattung(departure.line.product),
                    },
                    terminus: departure.stop.name
                }
            })
            res.json({entries: departuresMapped});
        }
    } catch (error) {
        res
            .status(500)
            .json({error: `Failed to fetch data from`});
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
            const { arrivals } = await vendo.arrivals(String(ortExtId), {
                duration: Number(limit),
                remarks: true,
                when: "2025-09-14T02:01:00+02:00",
                includeRelatedStations: true,
                stopovers: true,
            })
            const arrivalsMapped = arrivals.map((arrival: any) => {
                return {
                    zeit: arrival.when,
                    ezZeit: arrival.plannedWhen,
                    gleis: arrival.platform,
                    ezGleis: arrival.plannedPlatform,
                    ueber: arrival.previousStopovers.map((stopover: any) => {return stopover.stop.name}),
                    meldungen: arrival.remarks,
                    verkehrmittel: {
                        name: arrival.line.name,
                        produktGattung: convertProduktGattung(arrival.line.product),
                    },
                    terminus: arrival.stop.name
                }
            })
            res.json({entries: arrivalsMapped});
        }
    } catch (error) {
        res
            .status(500)
            .json({error: `Failed to fetch data from`});
    }
});

app.listen(vendoServerPort, () => console.log(`Vendo Server is running at ${vendoServerURL}\nClient should run at ${clientURL}`));
