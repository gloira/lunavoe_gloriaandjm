const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const WEDDING_PASSCODE = "JMGLORIA2026";

export default {
  async fetch(request, env) {
    // 处理预检请求（CORS）
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // 只允许 POST
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

    // ✅ 第一步：先校验密码（和前端保持一致）
    if (!data.passcode || data.passcode !== WEDDING_PASSCODE) {
      // 前端会根据 status === "invalid_password" 给出提示
      return new Response(
        JSON.stringify({ status: "invalid_password" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    const rsvp = {
      id,
      timestamp,
      name: data.name || "",
      attending: data.attending || "",
      message: data.message || "",
      // 注意：这里故意不保存 passcode，避免在 KV / Sheet 里留下密码
    };

    // 保存到 KV（备份）
    try {
      await env.RSVP_GLORIAJM.put(id, JSON.stringify(rsvp));
    } catch (err) {
      console.error("Failed to save to KV:", err);
      // 即使 KV 失败，也不影响后面往 Sheet 传，但你可以根据需要决定是否直接报错
    }

    // 转发到 Google Sheets（Apps Script）
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbw8NFgJ73QhrCIw_cXpomOilWyHDfiviEplncMj1RxJBIwZWr9E6xL16ti4q5H3aE19/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rsvp),
        }
      );
    } catch (err) {
      console.error("Failed to forward to Google Sheets:", err);
      // 这里失败了的话，前端还是会拿到 success，你如果想更严格，可以改成直接返回 error
    }

    // 一切正常
    return new Response(JSON.stringify({ status: "success", id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  },
};


