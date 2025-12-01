const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    // 处理预检请求（OPTIONS），否则浏览器会 CORS 报错
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

    // ⚠️ 这里用的是 Cloudflare 显示给你的绑定名：RSVP_GLORIAJM
    await env.RSVP_GLORIAJM.put(id, JSON.stringify(rsvp));

    return new Response(JSON.stringify({ status: "success", id }), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  },
};
