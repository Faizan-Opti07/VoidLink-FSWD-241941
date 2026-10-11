/* Shared navigation and small UI helpers. */
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showNotice(target, message, kind) {
    if (!target) return;
    target.textContent = message;
    target.className = `form-feedback ${kind || "success"}`;
  }

  function navigateWithTransition(url) {
    const overlay = document.querySelector(".transition-wipe");
    if (reduceMotion || !overlay) {
      window.location.href = url;
      return;
    }
    overlay.classList.add("is-active");
    window.setTimeout(() => { window.location.href = url; }, 520);
  }

  document.addEventListener("click", event => {
    const link = event.target.closest("a");
    if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
    if (link.hasAttribute("data-logout")) {
      try { localStorage.removeItem("voidlink-session"); } catch (_) {}
    }
    event.preventDefault();
    navigateWithTransition(url.href);
  });

  const themes = [
    ["default", "Void Original"],
    ["redish", "Reddish Black Hole"],
    ["lavender", "Lavender"],
    ["pinko", "Pinko"],
    ["arctic", "Whitist / Arctic White"],
    ["graphite", "Black Grey / Graphite"],
    ["nebula", "Nebula Blue"],
    ["emerald", "Emerald Pulse"],
    ["solar", "Solar Amber"]
  ];

  function setupThemePicker() {
    let saved = "default";
    try { saved = localStorage.getItem("voidlink-theme") || "default"; } catch (_) {}
    document.body.dataset.theme = saved;

    // Keep a subtle animated black hole visible after entering the app.
    if (!document.querySelector(".ambient-blackhole")) {
      const hole = document.createElement("div");
      hole.className = "ambient-blackhole";
      hole.setAttribute("aria-hidden", "true");
      hole.innerHTML = "<span></span>";
      document.body.prepend(hole);
    }

    const onAppPage = document.body.classList.contains("app-page");
    if (onAppPage && !document.querySelector(".inner-horizon")) {
      const innerHole = document.createElement("div");
      innerHole.className = "inner-horizon";
      innerHole.setAttribute("aria-hidden", "true");
      innerHole.innerHTML = "<span class=\"inner-horizon-ring inner-horizon-ring-a\"></span><span class=\"inner-horizon-ring inner-horizon-ring-b\"></span><i></i><b></b>";
      document.body.appendChild(innerHole);
    }

    // A small animated station keeps the space scene alive beyond the login screen.
    if (!document.querySelector(".void-station")) {
      const station = document.createElement("div");
      station.className = onAppPage ? "void-station void-station-app" : "void-station void-station-entry";
      station.setAttribute("aria-hidden", "true");
      station.innerHTML = '<span class="station-orbit"></span><span class="station-core"></span><span class="station-module station-module-a"></span><span class="station-module station-module-b"></span><span class="station-solar station-solar-a"></span><span class="station-solar station-solar-b"></span><span class="station-light"></span>';
      if (onAppPage) document.body.appendChild(station);
      else {
        const stage = document.querySelector(".blackhole-stage");
        if (stage) stage.appendChild(station); else document.body.appendChild(station);
      }
    }

    // Every page transition contains the large hole, inner hole, and station together.
    const transition = document.querySelector(".transition-wipe");
    if (transition && !transition.querySelector(".transition-cosmos")) {
      const cosmos = document.createElement("div");
      cosmos.className = "transition-cosmos";
      cosmos.setAttribute("aria-hidden", "true");
      cosmos.innerHTML = '<div class="transition-big-hole"><span></span><i></i></div><div class="transition-small-hole"><span></span></div><div class="transition-station"><span class="station-orbit"></span><span class="station-core"></span><span class="station-module station-module-a"></span><span class="station-module station-module-b"></span><span class="station-solar station-solar-a"></span><span class="station-solar station-solar-b"></span><span class="station-light"></span></div>';
      transition.prepend(cosmos);
    }
    const dock = document.createElement("div");
    dock.className = onAppPage ? "theme-dock theme-dock-inline" : "theme-dock";
    dock.innerHTML = '<span class="theme-swatch" aria-hidden="true"></span><label for="voidlink-theme-select">THEME</label><select id="voidlink-theme-select" aria-label="Choose color theme"></select>';
    const select = dock.querySelector("select");
    themes.forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      select.appendChild(option);
    });
    select.value = themes.some(([value]) => value === saved) ? saved : "default";
    select.addEventListener("change", () => {
      document.body.dataset.theme = select.value;
      try { localStorage.setItem("voidlink-theme", select.value); } catch (_) {}
    });

    if (onAppPage) {
      const actions = document.querySelector(".topbar .top-actions");
      if (actions) {
        dock.id = "app-theme-picker";
        actions.prepend(dock);
        const logout = document.createElement("a");
        logout.className = "signout-top";
        logout.href = "index.html";
        logout.setAttribute("data-logout", "");
        logout.innerHTML = '<i class="bi bi-power" aria-hidden="true"></i><span>POWER OFF</span>';
        actions.appendChild(logout);
      } else {
        document.body.appendChild(dock);
      }
    } else {
      document.body.appendChild(dock);
    }
  }

  setupThemePicker();

  // Add a slow-moving star field and lightweight interactive effects.
  function setupCosmicEffects() {
    if (!document.querySelector(".cosmic-particles")) {
      const field = document.createElement("div");
      field.className = "cosmic-particles";
      field.setAttribute("aria-hidden", "true");
      for (let i = 0; i < 34; i++) {
        const star = document.createElement("span");
        star.className = "cosmic-star";
        star.style.setProperty("--x", `${(i * 37 + 11) % 100}%`);
        star.style.setProperty("--y", `${(i * 61 + 7) % 100}%`);
        star.style.setProperty("--delay", `${(i % 9) * -0.7}s`);
        star.style.setProperty("--duration", `${5 + (i % 7)}s`);
        star.style.setProperty("--size", `${1 + (i % 3)}px`);
        field.appendChild(star);
      }
      document.body.prepend(field);
    }

    if (!reduceMotion) {
      document.addEventListener("pointermove", event => {
        document.body.style.setProperty("--pointer-x", `${event.clientX}px`);
        document.body.style.setProperty("--pointer-y", `${event.clientY}px`);
      }, { passive: true });
    }

    document.addEventListener("click", event => {
      const target = event.target.closest(".btn, .btn-void, .btn-quiet, .icon-button, .signout-top");
      if (!target || reduceMotion) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--ripple-x", `${event.clientX - rect.left}px`);
      target.style.setProperty("--ripple-y", `${event.clientY - rect.top}px`);
      target.classList.remove("is-rippling");
      void target.offsetWidth;
      target.classList.add("is-rippling");
      window.setTimeout(() => target.classList.remove("is-rippling"), 650);
    });

    if (!reduceMotion) {
      document.querySelectorAll(".glass-panel, .quote-card, .welcome-banner, .member-card, .friend-card, .profile-cover, .connections-banner").forEach((card, index) => {
        card.style.setProperty("--card-delay", `${Math.min(index * 55, 440)}ms`);
        card.classList.add("cosmic-card-in");
      });
    }
  }

  setupCosmicEffects();

  document.addEventListener("DOMContentLoaded", () => {
    const state = window.VoidData ? VoidData.getState() : null;
    if (!state) return;
    const user = VoidData.currentUser(state);
    document.querySelectorAll("[data-user-name]").forEach(el => { el.textContent = user.name; });
    document.querySelectorAll("[data-user-avatar]").forEach(el => { el.src = user.avatar; });
    document.querySelectorAll(".app-page").forEach(el => el.classList.add("page-ready"));
  });

  window.VoidUI = { showNotice, navigateWithTransition };
})();
