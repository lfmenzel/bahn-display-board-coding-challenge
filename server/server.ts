import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: "http://localhost:4200",
    methods: "GET,POST",
};

app.use(cors(corsOptions));

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

app.get("/api/station/:ortExtId/departures", async (req, res) => {
    try {
        const ortExtId = req.params.ortExtId
        const response = await axios.get(
            `https://www.bahn.de/web/api/reiseloesung/abfahrten?datum=2025-09-13&zeit=10:21:23&ortExtId=${ortExtId}&ortId=A%3D1%40O%3DBerlin+Hbf%40X%3D13369549%40Y%3D52525589%40U%3D80%40L%3D8011160%40B%3D1%40p%3D1754512874%40i%3DU%C3%97008065969%40&mitVias=true&maxVias=8&verkehrsmittel[]=ICE&verkehrsmittel[]=EC_IC&verkehrsmittel[]=IR&verkehrsmittel[]=REGIONAL&verkehrsmittel[]=SBAHN&verkehrsmittel[]=BUS&verkehrsmittel[]=SCHIFF&verkehrsmittel[]=UBAHN&verkehrsmittel[]=TRAM&verkehrsmittel[]=ANRUFPFLICHTIG`,
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
        const response = await axios.get(
            `https://www.bahn.de/web/api/reiseloesung/ankuenfte?datum=2025-09-13&zeit=10:25:58&ortExtId=${ortExtId}&ortId=A%3D1%40O%3DDresden+Hbf%40X%3D13732039%40Y%3D51040562%40U%3D80%40L%3D8010085%40B%3D1%40p%3D1755118759%40i%3DU%C3%97008006050%40&mitVias=true&maxVias=8&verkehrsmittel[]=ICE&verkehrsmittel[]=EC_IC&verkehrsmittel[]=IR&verkehrsmittel[]=REGIONAL`,
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
