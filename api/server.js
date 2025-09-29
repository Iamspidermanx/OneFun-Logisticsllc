import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 5000;

// Replace with your Apps Script URL
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw01_y-wxdxrOAShx1lPT3jkA4DHyppTRqX4hqnbrd_pf2RpGCqWB9hKV1kY6q-jp-i/exec";

app.use(cors());
app.use(express.json({ limit: "10mb" })); // allow base64 images

app.post("/api/submit", async (req, res) => {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    console.log("Google response:", text);

    res.status(response.status).send(text);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
