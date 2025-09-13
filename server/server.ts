import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.get("/api/station/test", async (req, res) => {
    try {
        res.json("OK");
    } catch (error) {
        res
            .status(500)
            .json({ error: "Failed to fetch data from the other backend" });

        console.error("REST start failed with: ", req.query, req.params)
    }
});

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

app.listen(3000, () => console.log("Server running on port 3000"));
