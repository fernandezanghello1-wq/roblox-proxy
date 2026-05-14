const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/proxy", async (req, res) => {

    try {

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

    console.log("Proxy funcionando en puerto 3000");

});