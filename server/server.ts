import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: "http://localhost:4200",
    methods: "GET,POST",
};

app.use(cors(corsOptions));

app.get("/api/station/autocomplete", async (req, res) => {
    try {
        const query = req.query.query
        const limit = req.query.limit
        const response = await axios.get(
            `https://www.bahn.de/web/api/reiseloesung/orte?suchbegriff=${query}&typ=ALL&limit=${limit}`,
        );
        res.json(response.data);
    } catch (error) {
        res
        .status(500)
        .json({ error: "Failed to fetch data from the other backend" });

        console.error("REST Autocomplete failed with: ", req.query, req.params)
    }
});

app.get("/api/station/:ortExtId/departures", async (req, res) => {
    try {
        const ortExtId = req.params.ortExtId
        const datum = req.query.datum
        const zeit = req.query.zeit
        const response = await axios.get(
            `https://www.bahn.de/web/api/reiseloesung/abfahrten?datum=${datum}&zeit=${zeit}&ortExtId=${ortExtId}`,
        );
        res.json(response.data);
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to fetch data from the other backend"});

        console.error("REST Departures failed with: ", req.query, req.params)
    }
});

app.get(`/api/station/:ortExtId/arrivals`, async (req, res) => {
    try {
        const ortExtId = req.params.ortExtId
        const datum = req.query.datum
        const zeit = req.query.zeit
        const response = await axios.get(
            `https://www.bahn.de/web/api/reiseloesung/ankuenfte?datum=${datum}&zeit=${zeit}&ortExtId=${ortExtId}`,
        );
        res.json(response.data);
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to fetch data from the other backend"});

        console.error("REST Arrivals failed with: ", req.query, req.params)
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
