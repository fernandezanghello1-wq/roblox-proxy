const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

const SECRET_KEY = "DJCHEROO_SECRET";

app.get("/proxy", async (req, res) => {

    try {

        const key = req.query.key;

        if (key !== SECRET_KEY) {
            return res.status(403).send("Unauthorized");
        }

        const url = req.query.url;

        if (!url) {
            return res.status(400).send("No URL");
        }

        const response = await axios.get(url);

        res.json(response.data);

    } catch (err) {

        console.log(err);

        res.status(500).send("Error");

    }

});

app.listen(3000, () => {

    console.log("Secure proxy funcionando");

});