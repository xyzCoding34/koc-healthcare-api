const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.post("/api/heart-rate", async (req, res) => {
  console.log("req", req.body);
  const { rate } = req.body;

  const token = "q9ivj64py5h1qhff3n9a";
  const url =
    "http://eu.thingsboard.cloud/api/v1/q9ivj64py5h1qhff3n9a/telemetry";

  // prettier-ignore
  try {
    const response = await axios.post(
      url,
      {
        "rate": Number(rate), 
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    res.status(200).json({
      message: "Veri başarılı şekilde gönderildi!",
      response: response.data,
    });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({
      message: "Server hatası.",
      error: error.message,
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
