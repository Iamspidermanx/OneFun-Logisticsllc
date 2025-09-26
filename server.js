import express from "express";
import fetch from "node-fetch"; 
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CLIENT_ID = "377412561183-bole32mvt4dg5bdr993vs4q2rfngpute.apps.googleusercontent.com";
const ALLOWED_EMAILS = ["lexinjones47@gmail.com", "jeremyalexander9933@gmail.com", "onefunlogistics@myfunllc.com"];
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwtw2916vPE3bkndjVxWJHrXsF8D46MQZQQEANLVXGKJ-qxKuhCbg8rXkjsNR9trXy0/exec";

// Verify token endpoint
app.post("/verify-token", async (req, res) => {
  const { token } = req.body;
  try {
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    const data = await response.json();
    if (data.aud !== CLIENT_ID) return res.status(401).json({ success: false, error: "Invalid client ID" });
    if (!ALLOWED_EMAILS.includes(data.email)) return res.status(403).json({ success: false, error: "Unauthorized email" });
    return res.json({ success: true, email: data.email });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Token verification failed" });
  }
});

// Update order endpoint
app.post("/update-order", async (req, res) => {
  const { token, trackingId, status, lat, lng } = req.body;

  // Verify token first
  try {
    const verifyRes = await fetch(`http://localhost:4000/verify-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) return res.status(403).json({ error: "Unauthorized" });

    // Forward to Apps Script
    const params = new URLSearchParams({ action: "updateOrder", trackingId });
    if (status) params.append("status", status);
    if (lat) params.append("lat", lat);
    if (lng) params.append("lng", lng);

    const scriptRes = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`);
    const data = await scriptRes.json();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Update failed" });
  }
});

app.listen(4000, () => console.log("Backend running on port 4000"));
