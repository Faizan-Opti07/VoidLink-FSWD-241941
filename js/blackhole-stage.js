/**
 * VOIDLINK • AMBIENT SINGULARITY & ORBITAL SATELLITE ENGINE
 * Ensures the illustrated Black Hole with Accretion Flow & Orbiting Station 
 * from the user's project is persistently alive inside the app at all times.
 */

(function () {
  'use strict';

  // Template for the exact illustrated black hole stage from user's project (Picture 1)
  function createBlackHoleStageHTML(isCompact) {
    const stationClass = isCompact ? 'void-station void-station-app' : 'void-station void-station-entry';
    return `
      <div class="blackhole-stage" aria-label="Animated black hole illustration with orbiting satellite">
        <div class="star-drift star-drift-one"></div>
        <div class="star-drift star-drift-two"></div>
        <div class="orbit orbit-one"></div>
        <div class="orbit orbit-two"></div>
        <div class="accretion accretion-back"></div>
        <div class="event-horizon"><div class="horizon-core"></div></div>
        <div class="accretion accretion-front"></div>
        <div class="${stationClass}">
          <span class="station-orbit"></span>
          <span class="station-solar station-solar-a"></span>
          <span class="station-module station-module-a"></span>
          <span class="station-core"></span>
          <span class="station-module station-module-b"></span>
          <span class="station-solar station-solar-b"></span>
          <span class="station-light"></span>
        </div>
        <div class="hole-caption">
          <span>EVENT HORIZON</span><i></i><span>STATION ALPHA IN ORBIT</span>
        </div>
      </div>
    `;
  }

  // Ensure persistent ambient viewport exists on body
  function ensureAmbientSingularity() {
    if (document.getElementById('ambient-singularity-viewport')) return;

    // Do not double-mount on login.html where the primary dual binary black hole canvas is rendered
    if (window.location.pathname.includes('login.html') || window.location.pathname.endsWith('/')) {
      // If we are on login or root pointing to login, don't double mount ambient
      const onLoginPage = document.getElementById('login-form') !== null;
      if (onLoginPage) return;
    }

    const viewport = document.createElement('div');
    viewport.id = 'ambient-singularity-viewport';
    viewport.className = 'ambient-singularity-viewport';
    viewport.setAttribute('aria-hidden', 'true');

    // Build Horizon Theme Quickbar so users can change theme directly inside horizon
    const themes = window.THEMES_CONFIG || [
      { id: 'grey', accent: '#a5a5b8', name: 'Grey' },
      { id: 'crimson', accent: '#f43f5e', name: 'Crimson' },
      { id: 'lavender', accent: '#c084fc', name: 'Lavender' },
      { id: 'white', accent: '#0284c7', name: 'White' },
      { id: 'orange', accent: '#f97316', name: 'Orange' },
      { id: 'green', accent: '#10b981', name: 'Green' },
      { id: 'aqua', accent: '#06b6d4', name: 'Aqua' },
      { id: 'gold', accent: '#fbbf24', name: 'Gold' },
      { id: 'sapphire', accent: '#3b82f6', name: 'Sapphire' },
      { id: 'cyber', accent: '#ec4899', name: 'Cyber' }
    ];

    const themeDotsHtml = `
      <div class="horizon-theme-quickbar" onclick="event.stopPropagation()">
        <span class="text-[9px] font-mono tracking-widest text-gray-300 uppercase font-semibold mr-1">HORIZON THEME:</span>
        <div class="flex items-center gap-1.5">
          ${themes.map(t => `
            <button 
              type="button" 
              class="horizon-theme-dot" 
              style="background-color: ${t.accent};" 
              title="${t.name} Singularity"
              onclick="window.setActiveTheme('${t.id}')">
            </button>
          `).join('')}
        </div>
      </div>
    `;

    viewport.innerHTML = createBlackHoleStageHTML(true) + themeDotsHtml;
    document.body.appendChild(viewport);
  }

  // Bind focus view toggling
  function bindSingularityControls() {
    const viewport = document.getElementById('ambient-singularity-viewport');
    if (!viewport) return;

    const toggles = document.querySelectorAll('[data-toggle-singularity], #toggle-ambient-focus, #singularity-focus-toggle');
    toggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        viewport.classList.toggle('focused');
        const isFocused = viewport.classList.contains('focused');
        btn.setAttribute('aria-pressed', isFocused ? 'true' : 'false');
        
        // Show status feedback if toast system is present
        if (window.showToast) {
          window.showToast(isFocused ? 'Singularity Focus: Max Observational Horizon' : 'Singularity: Ambient Orbit Mode', 'info');
        }

        // Announce horizon mode with voice
        if (isFocused && window.speakPageVoice) {
          window.speakPageVoice();
        }
      });
    });

    // Close focus view when clicking directly outside on the viewport
    viewport.addEventListener('click', () => {
      if (viewport.classList.contains('focused')) {
        viewport.classList.remove('focused');
      }
    });
  }

  // Bind interactive shiny vibrating black hole clicks
  function bindShinyBlackHoleInteractions() {
    document.querySelectorAll('.shiny-blackhole-vibrating, #login-brand-blackhole').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const target = el.classList.contains('shiny-blackhole-vibrating') ? el : el.querySelector('.shiny-blackhole-vibrating');
        if (target) {
          target.classList.add('pulse-active');
          setTimeout(() => target.classList.remove('pulse-active'), 900);
        }
        if (window.playBurstSound) {
          window.playBurstSound();
        }
        if (window.speakPageVoice) {
          window.speakPageVoice();
        }
      });
    });
  }

  // Synchronize connections badge with actual friend count in state
  function updateConnectionCounts() {
    try {
      const saved = localStorage.getItem('connecfriend_state');
      if (saved) {
        const state = JSON.parse(saved);
        const currentUser = localStorage.getItem('connecfriend_active_user') || 'user_1';
        const friendsCount = (state.users && state.users[currentUser] && state.users[currentUser].friends)
          ? state.users[currentUser].friends.length
          : 3;
        
        document.querySelectorAll('.aesthetic-nav-badge, [data-friends-count-badge]').forEach(badge => {
          badge.textContent = friendsCount;
        });
      }
    } catch (_) {}
  }

  document.addEventListener('DOMContentLoaded', () => {
    ensureAmbientSingularity();
    bindSingularityControls();
    bindShinyBlackHoleInteractions();
    updateConnectionCounts();
  });

  // Re-check after state mutations or transitions
  window.addEventListener('connecfriend_state_changed', updateConnectionCounts);
  window.addEventListener('voidThemeChanged', () => {
    // Re-check active dot indicator
  });

  // Expose global generator for inline HUD cards
  window.renderSingularityStage = createBlackHoleStageHTML;
})();
