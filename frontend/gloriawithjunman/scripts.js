const RSVP_API_URL = "https://www.lunavoe.com/gloriawithjunman/rsvp-api";
const RSVP_PASSCODE = "JMGLORIA2026";

const i18n = {
  en: {
    nav_home: "Home",
    nav_schedule: "Schedule",
    nav_venue: "Venue",
    nav_travel: "Travel Guide",
    nav_gallery: "Gallery",
    nav_rsvp: "RSVP",

    footer_text: "Gloria &amp; Junman · Bali · 2026 · Lunavoe",

    home_overlay_title: "We’re Getting Married",
    home_date_place: "September 11 – 13, 2026 · Uluwatu · Bali, Indonesia",
    home_intro_kicker: "A long-weekend escape with sunset, ocean breeze, and our favorite people.",
    home_intro_body:
      "We are so excited to celebrate our wedding with you in Bali. This site has everything you need for the weekend — schedule, venue details, travel tips, and a place to RSVP.",

    schedule_title: "Weekend Schedule",
    schedule_subtitle: "A relaxed Bali weekend with plenty of time to enjoy the island.",
    schedule_fri_date: "Friday · Arrival",
    schedule_fri_label: "Check‑in & Free Day",
    schedule_fri_body1:
      "Guests check into the villa or nearby hotels, settle in, and enjoy Bali at your own pace.",
    schedule_fri_body2:
      "Explore Uluwatu’s cafes, beaches, and sunset spots — we’ll share our favorite places in the Travel Guide.",
    schedule_sat_date: "Saturday · Wedding Day",
    schedule_sat_label: "Stone Villas Uluwatu",
    schedule_sat_1: "3:30 PM Guest arrival & check‑in at the venue",
    schedule_sat_2: "4:00 PM Wedding ceremony",
    schedule_sat_3: "5:00 PM Cocktail hour & photos",
    schedule_sat_4: "7:00 PM Dinner reception under the stars",
    schedule_sat_5: "10:00 PM After party",
    schedule_sat_6: "1:00 AM End of celebrations",
    schedule_sun_date: "Sunday · Slow Morning",
    schedule_sun_label: "Free Day & Departures",
    schedule_sun_body1:
      "Sleep in, enjoy a relaxed brunch, or head to the beach one last time before flights.",
    schedule_sun_body2:
      "Whether you’re flying home or continuing your Bali adventure, we’re so grateful you came.",

    venue_title: "Venue & Stay",
    venue_subtitle: "Stone Villas Uluwatu · A clifftop villa overlooking the Indian Ocean.",
    venue_block1_title: "Wedding Venue",
    venue_block1_body:
      "Stone Villas Uluwatu is a private clifftop villa in Uluwatu, with views of the ocean, tropical gardens, and a lawn where our ceremony and dinner will take place.\n\nThe exact address and arrival details will be shared in our guest group closer to the date, along with transportation arrangements for those not staying on site.",
    venue_block2_title: "Where to Stay",
    venue_block2_body:
      "Some guests will stay inside the main villa complex, and others will stay at nearby hotels or villas in Uluwatu. We’ll coordinate rooms and share confirmed options in our guest chat group once bookings are finalized.\n\nIf you’re planning to extend your stay or book your own place, we recommend staying within the Uluwatu area so it’s easy to get to the venue.",

    travel_title: "Travel Guide",
    travel_subtitle: "Ideas for slow mornings, sunset spots, and post‑wedding adventures.",
    travel_uluwatu_title: "Around Uluwatu · Before the Wedding",
    travel_uluwatu_intro:
      "Friday and the wedding morning are free time — here are some ideas if you’d like to explore nearby:",
    travel_uluwatu_1: "Cafes with views in Uluwatu for brunch and coffee.",
    travel_uluwatu_2: "Beach clubs and sunset bars along the cliff for golden hour.",
    travel_uluwatu_3: "Relaxed beaches where you can swim, read, or just do nothing.",
    travel_after_title: "After the Wedding · Keep Exploring",
    travel_after_intro:
      "If you’re staying longer in Bali, some popular areas to spend a few more days:",
    travel_after_1: "Seminyak & Canggu – cafes, shopping, and sunsets.",
    travel_after_2: "Jimbaran – seafood by the beach and calm evenings.",
    travel_after_3: "Ubud – rice terraces, temples, and spa days.",

    gallery_title: "Gallery",
    gallery_subtitle: "Engagement photos now, wedding memories later.",
    gallery_slot1: "Portrait placeholder",
    gallery_slot2: "Beach placeholder",
    gallery_slot3: "Candid placeholder",
    gallery_slot4: "Film still placeholder",
    gallery_slot5: "Villa placeholder",
    gallery_slot6: "To be filled after the wedding",

    rsvp_title: "RSVP",
    rsvp_subtitle:
      "This page is for invited guests only. Please enter the access code to continue.",
    rsvp_gate_label: "Wedding Access Code<span class=\"required\">*</span>",
    rsvp_gate_button: "Unlock RSVP Form",
    rsvp_name: "Name<span class=\"required\">*</span>",
    rsvp_attend: "Will you attend?<span class=\"required\">*</span>",
    rsvp_attend_yes: "Yes, I’ll be there",
    rsvp_attend_no: "Sorry, can’t make it",
    rsvp_message_label: "Message (optional)",
    rsvp_message_placeholder:
      "Dietary needs, plus one name, or anything you’d like to tell us.",
    rsvp_submit: "Send RSVP",

    rsvp_gate_missing: "Please enter the access code.",
    rsvp_gate_wrong: "The access code does not match our records. Please check your invitation.",
    rsvp_status_sending: "Sending your RSVP...",
    rsvp_status_missing: "Please fill in your name and whether you will attend.",
    rsvp_status_success: "Thank you! We’ve received your RSVP 🥂",
    rsvp_status_error:
      "Sorry, something went wrong. Please try again later or contact us directly.",
  },

  zh: {
    nav_home: "首页",
    nav_schedule: "行程安排",
    nav_venue: "场地与住宿",
    nav_travel: "出行与游玩",
    nav_gallery: "照片集",
    nav_rsvp: "出席回覆",

    footer_text: "Gloria &amp; Junman · 巴厘岛 · 2026 · Lunavoe",

    home_overlay_title: "We’re Getting Married",
    home_date_place: "2026 年 9 月 11–13 日 · 印度尼西亚 · 巴厘岛 · 乌鲁瓦图",
    home_intro_kicker: "和最重要的人一起，在日落与海风中度过一个小小假期。",
    home_intro_body:
      "非常期待你来到巴厘岛参加我们的婚礼。这个网站汇总了周末行程、婚礼场地、交通与住宿建议，以及 RSVP 出席回覆。",

    schedule_title: "周末行程",
    schedule_subtitle: "轻松惬意的巴厘岛周末，留出足够的时间给海风与度假。",
    schedule_fri_date: "周五 · 抵达",
    schedule_fri_label: "入住与自由活动",
    schedule_fri_body1:
      "宾客在别墅或附近酒店办理入住，调整时差，慢慢进入度假状态。",
    schedule_fri_body2:
      "可以按自己的节奏逛咖啡馆、去海边散步或看日落，推荐地点会写在「出行与游玩」页面。",

    schedule_sat_date: "周六 · 婚礼当天",
    schedule_sat_label: "Stone Villas Uluwatu",
    schedule_sat_1: "15:30 宾客到场 & 签到",
    schedule_sat_2: "16:00 婚礼仪式",
    schedule_sat_3: "17:00 鸡尾酒与合影",
    schedule_sat_4: "19:00 星空晚宴",
    schedule_sat_5: "22:00 After Party",
    schedule_sat_6: "凌晨 1:00 活动结束",

    schedule_sun_date: "周日 · 慢悠悠的早晨",
    schedule_sun_label: "自由活动 & 返程",
    schedule_sun_body1:
      "睡到自然醒，吃个早午餐，或者再去海边走走，然后根据各自行程安排返程或继续旅行。",
    schedule_sun_body2:
      "无论你是回家还是继续在巴厘岛度假，我们都非常感激你抽空来参加这场婚礼。",

    venue_title: "场地与住宿",
    venue_subtitle: "Stone Villas Uluwatu · 悬崖上的私人别墅。",
    venue_block1_title: "婚礼场地",
    venue_block1_body:
      "Stone Villas Uluwatu 是位于乌鲁瓦图的一座私人悬崖别墅，可以眺望印度洋，并拥有花园草坪作为仪式与晚宴区域。\n\n具体地址与到场方式会在婚礼临近时，在宾客群里统一发送，并根据住在不同地点的宾客安排接送或交通指引。",
    venue_block2_title: "住宿安排",
    venue_block2_body:
      "部分宾客会住在别墅内，其余宾客会安排在乌鲁瓦图附近的酒店或独立别墅。具体房间分配和推荐酒店，会在确定后在群里统一沟通。\n\n如果你计划自己延长行程或另外订房，建议尽量住在乌鲁瓦图区域，方便往返婚礼场地。",

    travel_title: "出行与游玩",
    travel_subtitle: "给你一些周末自由时间和婚礼后续行程的灵感。",
    travel_uluwatu_title: "乌鲁瓦图周边 · 婚礼前一天",
    travel_uluwatu_intro: "周五和婚礼当天白天都是自由活动时间，可以考虑：",
    travel_uluwatu_1: "在乌鲁瓦图找一间景观咖啡馆吃早午餐、喝咖啡。",
    travel_uluwatu_2: "去看海景的日落酒吧或 beach club，感受悬崖海景。",
    travel_uluwatu_3: "挑一个喜欢的海滩发呆、游泳或者只是晒太阳。",

    travel_after_title: "婚礼之后 · 继续度假",
    travel_after_intro: "如果你打算多待几天，以下区域都很适合安排后续行程：",
    travel_after_1: "水明漾 & 苍古：咖啡馆、餐厅、小店与日落海滩。",
    travel_after_2: "金巴兰：沙滩海鲜大排档，氛围悠闲安静。",
    travel_after_3: "乌布：稻田梯田、寺庙与 SPA，一点点山间小镇的感觉。",

    gallery_title: "照片集",
    gallery_subtitle: "婚纱照与婚礼照片，之后会陆续更新。",
    gallery_slot1: "人像占位图",
    gallery_slot2: "海边占位图",
    gallery_slot3: "抓拍占位图",
    gallery_slot4: "胶片感占位图",
    gallery_slot5: "别墅占位图",
    gallery_slot6: "婚礼结束后会更新",

    rsvp_title: "出席回覆（RSVP）",
    rsvp_subtitle: "此页面仅供受邀宾客使用，请先输入婚礼密码后再填写表单。",
    rsvp_gate_label: "婚礼密码<span class=\"required\">*</span>",
    rsvp_gate_button: "解锁 RSVP 表单",
    rsvp_name: "姓名<span class=\"required\">*</span>",
    rsvp_attend: "是否出席？<span class=\"required\">*</span>",
    rsvp_attend_yes: "会出席",
    rsvp_attend_no: "无法出席",
    rsvp_message_label: "留言（可选）",
    rsvp_message_placeholder:
      "如有饮食禁忌、是否携伴出席，或者想对我们说的话，都可以写在这里。",
    rsvp_submit: "提交",

    rsvp_gate_missing: "请输入婚礼密码。",
    rsvp_gate_wrong: "婚礼密码不正确，请对照请柬再次确认。",
    rsvp_status_sending: "正在发送出席回覆……",
    rsvp_status_missing: "请填写姓名，并选择是否出席。",
    rsvp_status_success: "谢谢！我们已经收到你的出席回覆 🥂",
    rsvp_status_error: "抱歉，提交出错了，请稍后重试，或直接联系我们。",
  },
};

let currentLang = localStorage.getItem("gj_lang") || "en";

function applyLanguage(lang) {
  const dict = i18n[lang] || i18n.en;
  document.documentElement.lang = lang === "en" ? "en" : "zh-Hans";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = dict[key];
    if (typeof val === "string") {
      el.innerHTML = val;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const val = dict[key];
    if (typeof val === "string") {
      el.setAttribute("placeholder", val);
    }
  });

  const langBtn = document.getElementById("lang-switch");
  if (langBtn) {
    langBtn.textContent = lang === "en" ? "中文" : "EN";
  }
}

function initLanguage() {
  const btn = document.getElementById("lang-switch");
  if (btn) {
    btn.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "zh" : "en";
      localStorage.setItem("gj_lang", currentLang);
      applyLanguage(currentLang);
    });
  }
  applyLanguage(currentLang);
}

function initNav() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("is-open");
      mobileMenu.classList.toggle("show");
    });

    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        hamburgerBtn.classList.remove("is-open");
        mobileMenu.classList.remove("show");
      })
    );
  }

  const path = window.location.pathname;
  const links = document.querySelectorAll(".nav-main a");
  links.forEach((link) => {
    if (link.getAttribute("href") === "" || !link.getAttribute("href")) return;
    if (path === "/gloriawithjunman/" && link.getAttribute("href") === "/gloriawithjunman/") {
      link.classList.add("is-current");
    } else if (path.startsWith(link.getAttribute("href")) && link.getAttribute("href") !== "/gloriawithjunman/") {
      link.classList.add("is-current");
    }
  });
}

function initRsvp() {
  const gateInput = document.getElementById("rsvp-passcode");
  const gateBtn = document.getElementById("rsvp-unlock-btn");
  const gateStatus = document.getElementById("rsvp-gate-status");
  const formSection = document.getElementById("rsvp-form-section");
  const rsvpForm = document.getElementById("rsvp-form");
  const rsvpStatus = document.getElementById("rsvp-status");

  if (!gateInput || !gateBtn || !formSection || !rsvpForm) return;

  gateBtn.addEventListener("click", () => {
    const value = gateInput.value.trim();
    if (!value) {
      gateStatus.textContent = i18n[currentLang].rsvp_gate_missing;
      gateStatus.className = "rsvp-status rsvp-status--error";
      return;
    }
    if (value !== RSVP_PASSCODE) {
      gateStatus.textContent = i18n[currentLang].rsvp_gate_wrong;
      gateStatus.className = "rsvp-status rsvp-status--error";
      return;
    }
    gateStatus.textContent = "";
    gateStatus.className = "rsvp-status";
    formSection.classList.remove("hidden");
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  rsvpForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    rsvpStatus.textContent = i18n[currentLang].rsvp_status_sending;
    rsvpStatus.className = "rsvp-status rsvp-status--info";

    const formData = new FormData(rsvpForm);
    const name = (formData.get("name") || "").toString().trim();
    const attending = (formData.get("attending") || "").toString();
    const message = (formData.get("message") || "").toString().trim();

    if (!name || !attending) {
      rsvpStatus.textContent = i18n[currentLang].rsvp_status_missing;
      rsvpStatus.className = "rsvp-status rsvp-status--error";
      return;
    }

    try {
      const response = await fetch(RSVP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          attending,
          message,
          passcode: RSVP_PASSCODE,
        }),
      });

      if (!response.ok) {
        throw new Error("Network error");
      }

      const data = await response.json();
      if (data.status === "success") {
        rsvpStatus.textContent = i18n[currentLang].rsvp_status_success;
        rsvpStatus.className = "rsvp-status rsvp-status--success";
        rsvpForm.reset();
      } else if (data.status === "invalid_password") {
        rsvpStatus.textContent = i18n[currentLang].rsvp_gate_wrong;
        rsvpStatus.className = "rsvp-status rsvp-status--error";
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      rsvpStatus.textContent = i18n[currentLang].rsvp_status_error;
      rsvpStatus.className = "rsvp-status rsvp-status--error";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initNav();
  initRsvp();
});
