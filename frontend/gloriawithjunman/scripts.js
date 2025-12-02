const RSVP_API_URL = "https://www.lunavoe.com/gloriawithjunman/rsvp-api";
const RSVP_PASSCODE = "JMGLORIA2026";

const i18n = {
  en: {
    nav_home: "Home",
    nav_schedule: "Schedule",
    nav_venue: "Venue &amp; Stay",
    nav_travel: "Travel &amp; Ideas",
    nav_gallery: "Gallery",
    nav_rsvp: "RSVP",

    footer_text: "Gloria &amp; Junman · Bali · 2026 · Lunavoe",

    hero_eyebrow: "Bali Wedding Weekend",
    hero_subtitle: "Sunset, ocean breeze, and a weekend with loved ones.",
    hero_details: "September 11–13, 2026<br />Uluwatu · Bali, Indonesia",
    hero_cta: "RSVP Online",

    home_intro_title: "Welcome to Bali",
    home_intro_text:
      "We’re so grateful you’re considering joining us in Uluwatu. This site has all the details for the weekend — schedule, venue, travel ideas, and RSVP.",

    schedule_title: "Weekend Schedule",
    schedule_lead:
      "A relaxed Bali weekend so you can enjoy the ocean breeze, good food, and time together.",
    schedule_fri_title: "Friday · Arrival & Free Day",
    schedule_fri_body:
      "Guests check in to their hotels or villas and enjoy a free day to explore Uluwatu — cafes, beaches, or a sunset drink if you’d like.",
    schedule_sat_title: "Saturday · Wedding Day",
    schedule_sat_item1: "<strong>3:30 PM</strong> · Arrival & guest check-in at the venue",
    schedule_sat_item2: "<strong>4:00 PM</strong> · Wedding ceremony",
    schedule_sat_item3: "<strong>~5:00 PM</strong> · Cocktail hour after the ceremony",
    schedule_sat_item4: "<strong>7:00 PM</strong> · Dinner",
    schedule_sat_item5: "<strong>10:00 PM</strong> · After party",
    schedule_sat_item6: "<strong>1:00 AM</strong> · End of the evening",
    schedule_sun_title: "Sunday · Free Day",
    schedule_sun_body:
      "No official events are planned. Feel free to relax, prepare for your flight home, or continue your Bali adventure.",

    venue_title: "Venue &amp; Stay",
    venue_lead:
      "Our celebration will take place at a private villa in Uluwatu. Some guests will stay at the venue, others at nearby hotels and villas in the area.",
    venue_on_title: "Stone Villas Uluwatu",
    venue_on_body:
      "Our wedding will be held at Stone Villas Uluwatu in Uluwatu, Bali, Indonesia. A portion of guests will be staying directly at the villa. If you’ve been assigned a room here, we’ll share detailed information such as room allocation and check-in time in our guest group chat closer to the date.",
    venue_on_note:
      "Accommodation details and room arrangements at the villa will be confirmed in the group chat once plans are finalized.",
    venue_off_title: "Nearby Hotels &amp; Villas",
    venue_off_body:
      "For guests staying off-site, we’ll share recommended hotels and villas in Uluwatu and surrounding areas like Jimbaran, Seminyak, and Canggu. We’ll coordinate suggestions in the group chat so you can stay close to friends and family.",

    travel_title: "Travel &amp; Ideas",
    travel_lead:
      "Since you’re coming all the way to Bali, we’d love for you to turn the wedding into a little holiday. Here are some ideas for before and after the big day.",
    travel_uluwatu_title: "Around Uluwatu (Friday & Wedding Morning)",
    travel_uluwatu_intro:
      "On Friday and during free time before the wedding, you might like to explore Uluwatu’s beaches, cafes, and sunset spots.",
    travel_uluwatu_spot1_title: "Beach Clubs & Sunsets",
    travel_uluwatu_spot1_body:
      "Enjoy dramatic clifftop views and sunsets at beach clubs and bars along the Uluwatu coastline.",
    travel_uluwatu_spot2_title: "Cafes & Brunch",
    travel_uluwatu_spot2_body:
      "Uluwatu has plenty of relaxed cafes for coffee, brunch, and light lunches with ocean or jungle views.",
    travel_uluwatu_spot3_title: "Beaches & Temples",
    travel_uluwatu_spot3_body:
      "Explore Uluwatu’s beaches and the clifftop temple for stunning ocean views, especially at sunset.",

    travel_after_title: "After the Wedding",
    travel_after_lead:
      "If you’d like to stay longer in Bali, here are a few areas and ideas to help you plan.",
    travel_sem_title: "Seminyak",
    travel_sem_body:
      "Great for shopping, restaurants, and stylish bars — perfect if you enjoy a more urban, walkable area with plenty of dining options.",
    travel_canggu_title: "Canggu",
    travel_canggu_body:
      "Trendy cafes, beach clubs, and surf breaks. A good choice if you like a laid-back yet lively vibe with lots of brunch spots.",
    travel_jimbaran_title: "Jimbaran",
    travel_jimbaran_body:
      "Relax by the beach and enjoy seafood dinners on the sand at sunset.",
    travel_ubud_title: "Ubud",
    travel_ubud_body:
      "Rice terraces, temples, spas, and a quieter, more nature-focused side of Bali — ideal for a slower pace after the wedding.",

    gallery_title: "Gallery",
    gallery_lead:
      "Here we’ll share some of our favorite photos — from engagement shoots to the wedding itself.",
    gallery_note:
      "After the wedding, we’ll also add a way for you to upload and download photos from the celebration.",

    rsvp_title: "RSVP",
    rsvp_lead:
      "This RSVP page is for invited guests. Please enter the wedding access code to continue.",
    rsvp_gate_title: "Wedding Access Code",
    rsvp_gate_lead:
      "Please enter the wedding password from your invitation to unlock the RSVP form.",
    rsvp_pass_label: "Wedding code<span class=\"required\">*</span>",
    rsvp_pass_placeholder: "Enter the wedding password",
    rsvp_gate_button: "Unlock RSVP",
    rsvp_gate_error_wrong: "The wedding code is incorrect.",
    rsvp_gate_error_empty: "Please enter the wedding code.",
    rsvp_form_title: "Your Details",

    rsvp_name: "Name<span class=\"required\">*</span>",
    rsvp_attend: "Will you attend?<span class=\"required\">*</span>",
    rsvp_attend_yes: "Yes, I’ll be there",
    rsvp_attend_no: "Sorry, can’t make it",
    rsvp_message_label: "Message (optional)",
    rsvp_message_placeholder:
      "Dietary needs, plus one name, or anything you’d like to tell us.",
    rsvp_submit: "Send RSVP",

    rsvp_status_sending: "Sending your RSVP...",
    rsvp_status_missing:
      "Please fill in your name and whether you will attend.",
    rsvp_status_success: "Thank you! We’ve received your RSVP 🥂",
    rsvp_status_error:
      "Sorry, something went wrong. Please try again later or contact us directly.",
    rsvp_status_wrongcode: "The wedding code is incorrect.",
  },

  zh: {
    nav_home: "首页",
    nav_schedule: "行程安排",
    nav_venue: "场地与住宿",
    nav_travel: "旅行建议",
    nav_gallery: "相册",
    nav_rsvp: "出席回覆",

    footer_text: "Gloria &amp; Junman · 巴厘岛 · 2026 · Lunavoe",

    hero_eyebrow: "巴厘岛婚礼周末",
    hero_subtitle: "日落、海风，与重要的人一起度过的小小周末。",
    hero_details: "2026 年 9 月 11–13 日<br />印度尼西亚 · 巴厘岛 · 乌鲁瓦图",
    hero_cta: "在线填写出席回覆",

    home_intro_title: "欢迎来到巴厘岛",
    home_intro_text:
      "谢谢你愿意远道而来与我们相聚。这个网站会汇总婚礼周末的所有信息：行程安排、场地与住宿、旅行建议以及出席回覆。",

    schedule_title: "周末行程",
    schedule_lead:
      "轻松惬意的巴厘岛周末，一起感受海风、美食与相聚的时光。",
    schedule_fri_title: "周五 · 抵达与自由活动",
    schedule_fri_body:
      "宾客自行入住预订好的酒店或别墅，白天可自由安排行程：探店、海滩或看一场日落。我们不会安排正式活动。",
    schedule_sat_title: "周六 · 婚礼当天",
    schedule_sat_item1: "<strong>下午 3:30</strong> · 宾客抵达并签到入场",
    schedule_sat_item2: "<strong>下午 4:00</strong> · 婚礼仪式",
    schedule_sat_item3: "<strong>约下午 5:00</strong> · 仪式结束后鸡尾酒时光",
    schedule_sat_item4: "<strong>晚上 7:00</strong> · 正式晚宴",
    schedule_sat_item5: "<strong>晚上 10:00</strong> · After Party",
    schedule_sat_item6: "<strong>凌晨 1:00</strong> · 当天活动结束",
    schedule_sun_title: "周日 · 自由活动",
    schedule_sun_body:
      "周日没有正式安排，可以睡个懒觉、去做 SPA、逛逛周边，也可以开启接下来的巴厘岛旅程或准备返程。",

    venue_title: "场地与住宿",
    venue_lead:
      "婚礼将在乌鲁瓦图的一座私人别墅举行。部分宾客会入住场地内，其余宾客则会住在附近的酒店或民宿。",
    venue_on_title: "Stone Villas Uluwatu",
    venue_on_body:
      "我们的婚礼将在位于乌鲁瓦图的 Stone Villas Uluwatu 举行。部分房间将留给家人和亲密好友入住。如果你会住在场地内，我们会在宾客群里统一告知房型、入住时间等详细信息。",
    venue_on_note:
      "关于场地内具体房间安排与住宿细节，会在出行前通过宾客群统一确认和通知。",
    venue_off_title: "附近酒店与民宿",
    venue_off_body:
      "对于住在场地外的宾客，我们会在宾客群中推荐乌鲁瓦图及周边（例如金巴兰、水明漾、苍古）合适的酒店和民宿，方便大家和亲友住得相对近一些。",

    travel_title: "旅行建议",
    travel_lead:
      "既然都来到巴厘岛，很适合顺便安排一个小假期。这里是一些在乌鲁瓦图附近以及婚礼之后的行程灵感，可根据自己的时间自由组合。",
    travel_uluwatu_title: "乌鲁瓦图周边（周五 & 婚礼当天白天）",
    travel_uluwatu_intro:
      "周五和婚礼当天白天都比较自由，可以在乌鲁瓦图附近逛一逛、喝杯咖啡、去海边晒太阳或看一场日落。",
    travel_uluwatu_spot1_title: "看海与日落的酒吧 / Beach Club",
    travel_uluwatu_spot1_body:
      "乌鲁瓦图有许多临海的悬崖酒吧和 Beach Club，非常适合看日落、喝一杯，感受悬崖海景。",
    travel_uluwatu_spot2_title: "咖啡馆与早午餐",
    travel_uluwatu_spot2_body:
      "这里有很多氛围很好的咖啡馆和早午餐餐厅，可以慢慢吃一顿早餐或午餐，稍微适应一下海岛节奏。",
    travel_uluwatu_spot3_title: "海滩与乌鲁瓦图寺",
    travel_uluwatu_spot3_body:
      "如果喜欢探索，可以去附近的海滩走走，或者去乌鲁瓦图寺看看悬崖与海景，傍晚时分风景尤其漂亮。",

    travel_after_title: "婚礼之后去哪玩？",
    travel_after_lead:
      "如果你打算在婚礼结束后继续待在巴厘岛，这里有几个不同风格的区域可以选择：",
    travel_sem_title: "水明漾（Seminyak）",
    travel_sem_body:
      "适合喜欢餐厅、酒吧和购物的宾客。这里有许多精致餐厅和小店，街区也比较热闹，适合住在市区感觉的人。",
    travel_canggu_title: "苍古（Canggu）",
    travel_canggu_body:
      "网红咖啡馆、早午餐餐厅和海滩俱乐部的集中地，氛围年轻、适合喜欢冲浪、拍照和打卡咖啡馆的朋友。",
    travel_jimbaran_title: "金巴兰（Jimbaran）",
    travel_jimbaran_body:
      "以日落海景和沙滩海鲜闻名，可以在海边的桌子上看着日落吃烤海鲜，节奏相对轻松。",
    travel_ubud_title: "乌布（Ubud）",
    travel_ubud_body:
      "梯田、森林、寺庙和 SPA 集中区域，更安静、偏自然风光，适合想慢下来放松几天的行程。",

    gallery_title: "相册",
    gallery_lead:
      "这里会放一些我们的婚纱照、日常合照，以及婚礼当天的照片。",
    gallery_note:
      "婚礼结束后，我们也会开放上传与下载入口，方便大家分享与保存照片。",

    rsvp_title: "出席回覆（RSVP）",
    rsvp_lead:
      "此页面仅供受邀宾客使用。请先输入邀请函上的婚礼密码，然后再填写你的出席信息。",
    rsvp_gate_title: "婚礼密码",
    rsvp_gate_lead:
      "请输入邀请函上的婚礼密码，以解锁 RSVP 表单。",
    rsvp_pass_label: "婚礼密码<span class=\"required\">*</span>",
    rsvp_pass_placeholder: "请输入邀请函上的婚礼密码",
    rsvp_gate_button: "解锁 RSVP 表单",
    rsvp_gate_error_wrong: "婚礼密码不正确，请确认后再试。",
    rsvp_gate_error_empty: "请输入婚礼密码。",

    rsvp_form_title: "出席信息",
    rsvp_name: "姓名<span class=\"required\">*</span>",
    rsvp_attend: "是否出席？<span class=\"required\">*</span>",
    rsvp_attend_yes: "会出席",
    rsvp_attend_no: "不克前来",
    rsvp_message_label: "留言（可选）",
    rsvp_message_placeholder:
      "如有饮食禁忌、是否携伴出席、或想对我们说的话，都可以写在这里。",
    rsvp_submit: "提交",

    rsvp_status_sending: "正在发送出席回覆……",
    rsvp_status_missing: "请填写姓名，并选择是否出席。",
    rsvp_status_success: "谢谢！我们已经收到你的出席回覆 🥂",
    rsvp_status_error:
      "抱歉，提交出错了，请稍后重试，或直接联系我们。",
    rsvp_status_wrongcode: "婚礼密码不正确，请确认后再试。",
  },
};

let currentLang = localStorage.getItem("lang") || "en";

function applyLanguage(lang) {
  document.documentElement.lang = lang === "en" ? "en" : "zh-Hans";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = i18n[lang][key];
    if (value !== undefined) {
      el.innerHTML = value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = i18n[lang][key];
    if (value !== undefined) {
      el.setAttribute("placeholder", value);
    }
  });

  const btn = document.getElementById("lang-switch");
  if (btn) {
    btn.textContent = lang === "en" ? "中文" : "EN";
  }
}

applyLanguage(currentLang);

const langSwitchBtn = document.getElementById("lang-switch");
if (langSwitchBtn) {
  langSwitchBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "zh" : "en";
    localStorage.setItem("lang", currentLang);
    applyLanguage(currentLang);
  });
}

const headerEl = document.getElementById("site-header");
if (headerEl) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      headerEl.classList.add("scrolled");
    } else {
      headerEl.classList.remove("scrolled");
    }
  });
}

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

let unlockedPasscode = null;

const gateForm = document.getElementById("rsvp-gate-form");
const gateStatus = document.getElementById("rsvp-gate-status");
const rsvpSection = document.getElementById("rsvp-form-section");

if (gateForm) {
  gateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const t = i18n[currentLang];
    const passInput = document.getElementById("rsvp-passcode-gate");
    const value = passInput.value.trim();

    if (!value) {
      gateStatus.textContent = t.rsvp_gate_error_empty;
      gateStatus.className = "rsvp-status rsvp-status--error";
      return;
    }

    if (value !== RSVP_PASSCODE) {
      gateStatus.textContent = t.rsvp_gate_error_wrong;
      gateStatus.className = "rsvp-status rsvp-status--error";
      return;
    }

    unlockedPasscode = value;
    gateStatus.textContent = "";
    gateStatus.className = "rsvp-status";
    if (rsvpSection) {
      rsvpSection.classList.remove("hidden");
      rsvpSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

const rsvpForm = document.getElementById("rsvp-form");
const rsvpStatus = document.getElementById("rsvp-status");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const t = i18n[currentLang];

    if (!unlockedPasscode) {
      if (gateStatus) {
        gateStatus.textContent = t.rsvp_status_wrongcode;
        gateStatus.className = "rsvp-status rsvp-status--error";
      }
      return;
    }

    if (rsvpStatus) {
      rsvpStatus.textContent = t.rsvp_status_sending;
      rsvpStatus.className = "rsvp-status rsvp-status--info";
    }

    const formData = new FormData(rsvpForm);
    const name = formData.get("name")?.toString().trim();
    const attending = formData.get("attending")?.toString() || "";
    const message = formData.get("message")?.toString().trim() || "";

    if (!name || !attending) {
      if (rsvpStatus) {
        rsvpStatus.textContent = t.rsvp_status_missing;
        rsvpStatus.className = "rsvp-status rsvp-status--error";
      }
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
          passcode: unlockedPasscode,
        }),
      });

      if (!response.ok) {
        throw new Error("Network error");
      }

      const data = await response.json();
      if (data.status === "success") {
        if (rsvpStatus) {
          rsvpStatus.textContent = t.rsvp_status_success;
          rsvpStatus.className = "rsvp-status rsvp-status--success";
        }
        rsvpForm.reset();
      } else if (data.status === "invalid_password") {
        if (rsvpStatus) {
          rsvpStatus.textContent = t.rsvp_status_wrongcode;
          rsvpStatus.className = "rsvp-status rsvp-status--error";
        }
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      if (rsvpStatus) {
        rsvpStatus.textContent = t.rsvp_status_error;
        rsvpStatus.className = "rsvp-status rsvp-status--error";
      }
    }
  });
}
