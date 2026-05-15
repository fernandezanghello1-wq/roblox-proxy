const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "DJCHEROO_SECRET";

app.get("/", (req, res) => {
    res.send("Proxy funcionando 😎");
});

app.get("/proxy", async (req, res) => {

    try {

        const key = req.query.key;
        const url = decodeURIComponent(req.query.url);

        if (key !== SECRET_KEY) {
            return res.status(403).send("Unauthorized");
        }

        if (!url) {
            return res.status(400).send("Missing URL");
        }

        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        res.status(200).send(JSON.stringify(response.data));

    } catch (err) {

        console.log("PROXY ERROR:");
        console.log(err.response?.data || err.message);

        res.status(500).send("Proxy Error");

    }

});

app.post("/webhook", async (req, res) => {

    try {

        const key = req.query.key;

        if (key !== SECRET_KEY) {
            return res.status(403).send("Unauthorized");
        }

        const webhook =
            "https://discord.com/api/webhooks/1504662497704284232/NKPYplxnYxtvBSDkLQIoqn9Yj1Xrrn97bhAtmUcU_Uia4HoYHBEun7cFqliSnrrLeNYf";

        await axios.post(webhook, req.body, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        res.send("Webhook enviado 😎");

    } catch (err) {

        console.log("WEBHOOK ERROR:");
        console.log(err.response?.data || err.message);

        res.status(500).send("Webhook Error");

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Proxy funcionando en puerto " + PORT);
});