export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    let data;
    try {
      data = await request.json();
    } catch (err) {
      return new Response("Invalid JSON", { status: 400 });
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

    await env.RSVP_DATA.put(id, JSON.stringify(rsvp));

    return new Response(JSON.stringify({ status: "success", id }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};