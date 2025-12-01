const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

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

    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    const rsvp = {
      id,
      timestamp,
      name: data.name || "",
      attending: data.attending || "",
      message: data.message || "",
    };

    // 保存到 KV（备份）
    await env.RSVP_GLORIAJM.put(id, JSON.stringify(rsvp));

    // ⭐⭐⭐ forward 到 Google Sheet（你必须在这里加）
    try {
      await fetch("https://script.google.com/macros/s/AKfycbw8NFgJ73QhrCIw_cXpomOilWyHDfiviEplncMj1RxJBIwZWr9E6xL16ti4q5H3aE19/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rsvp)
      });
    } catch (err) {
      console.error("Failed to forward to Google Sheets:", err);
    }

    return new Response(JSON.stringify({ status: "success", id }), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  },
};

