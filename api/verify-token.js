import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const AUTHORIZED_USERS = (process.env.AUTHORIZED_USERS || "").split(",");

const client = new OAuth2Client(CLIENT_ID);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    if (!AUTHORIZED_USERS.includes(email)) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.status(200).json({ success: true, email });
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(401).json({ error: "Invalid token" });
  }
}
