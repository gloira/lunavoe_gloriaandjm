const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const WEDDING_PASSCODE = "JMGLORIA2026";

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    let data;
    try {
      data = await request.json();
    } catch (err) {
      return new Response("Invalid JSON", {
        status: 400,
        headers: corsHeaders,
      });
    }

    if (!data.passcode || data.passcode !== WEDDING_PASSCODE) {
      return new Response(JSON.stringify({ status: "invalid_password" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    const id =
      (data.recordId || "").toString().trim() || crypto.randomUUID();

    const timestamp = new Date().toISOString();
    const attending = (data.attending || "").toString().trim();
    const hasAllergy =
      attending === "Yes" ? (data.hasAllergy || "").toString().trim() : "";
    const bringingGuest =
      attending === "Yes" ? (data.bringingGuest || "").toString().trim() : "";
    const guestHasAllergy =
      attending === "Yes" && bringingGuest === "Yes"
        ? (data.guestHasAllergy || "").toString().trim()
        : "";

    const rsvp = {
      id,
      timestamp,
      name: (data.name || "").toString().trim(),
      attending,
      hasAllergy,
      allergyRemarks:
        attending === "Yes" && hasAllergy === "Yes"
          ? (data.allergyRemarks || "").toString().trim()
          : "",
      bringingGuest,
      guestName:
        attending === "Yes" && bringingGuest === "Yes"
          ? (data.guestName || "").toString().trim()
          : "",
      guestHasAllergy,
      guestAllergyRemarks:
        attending === "Yes" &&
        bringingGuest === "Yes" &&
        guestHasAllergy === "Yes"
          ? (data.guestAllergyRemarks || "").toString().trim()
          : "",
      message: (data.message || "").toString().trim(),
    };

    try {
      await env.RSVP_GLORIAJM.put(id, JSON.stringify(rsvp));
    } catch (err) {
      console.error("Failed to save to KV:", err);
    }

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxgosAVPHg3uYcYAl-dRAP8dQlBK2ightTQVRYbdNJIfJhWJEHF_ISnifhWwrIoiE91/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rsvp),
        }
      );
    } catch (err) {
      console.error("Failed to forward to Google Sheets:", err);
    }

    return new Response(JSON.stringify({ status: "success", id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  },
};

