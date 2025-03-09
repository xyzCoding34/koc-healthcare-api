import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { verifyToken, getUserIdFromToken, loginUser } from "./auth.js";
import { createHeartRateRecord } from "./db.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

// Send heart rate notifications to ThingsBoard
app.post("/api/heart-rate", async (req, res) => {
  const { rate } = req.body;
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token bulunamadı" });
  }

  try {
    verifyToken(token);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }

  const url = process.env.HEART_RATE_URL;

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

    const userId = getUserIdFromToken(token);

    if(!userId) {
      return res.status(401).json({message: "Geçersiz token."});
    }

    await createHeartRateRecord(userId, rate)

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

app.post("/api/login", async (req, res) => {
  const { user_name, password } = req.body;

  if (!user_name || !password) {
    return res
      .status(400)
      .json({ message: "Kullanıcı adı ve parola gereklidir" });
  }

  try {
    const { token, first_name } = await loginUser(user_name, password);
    return res.status(200).json({
      message: "Giriş başarılı",
      token,
      first_name,
    });
  } catch (err) {
    console.error("Login hatası:", err);

    // TODO: err içerisine kısa kodlar eklenebilir.

    if (
      err.message === "Kullanıcı bulunamadı" ||
      err.message === "Geçersiz parola"
    ) {
      return res.status(401).json({
        message: err.message,
      });
    } else {
      return res.status(500).json({
        message: "Sunucu hatası. Lütfen daha sonra tekrar deneyin.",
      });
    }
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
