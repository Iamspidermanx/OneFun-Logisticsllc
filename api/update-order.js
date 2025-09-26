export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { trackingId, status, lat, lng } = req.body;

    const APPS_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwtw2916vPE3bkndjVxWJHrXsF8D46MQZQQEANLVXGKJ-qxKuhCbg8rXkjsNR9trXy0/exec";

    const response = await fetch(
      `${APPS_SCRIPT_URL}?action=updateOrder&trackingId=${trackingId}&status=${encodeURIComponent(
        status
      )}&lat=${lat}&lng=${lng}`
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ error: "Server error" });
  }
}
