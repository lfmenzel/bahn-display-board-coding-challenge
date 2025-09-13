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

app.listen(3000, () => console.log("Server running on port 3000"));
