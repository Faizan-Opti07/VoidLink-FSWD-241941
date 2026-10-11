// ==========================================================================
// VOIDLINK • HORIZON BLACK HOLE QUANTUM WARP TRANSITIONS & COSMIC VOICES
// Displays the authentic moving black hole from inside the Horizon.
// No bursted explosion, no shockwave. Just the clean, revolving singularity.
// ==========================================================================

const PAGE_VOICE_CONFIG = {
  'login.html': {
    name: 'Gateway Protocol',
    phrase: 'Event horizon initialized. Welcome to VoidLink gateway.',
    chime: [220, 329.63, 440],
    pitch: 1.05,
    rate: 0.95
  },
  'index.html': {
    name: 'Orbital Feed',
    phrase: 'Orbital feed synchronized. All signals live.',
    chime: [261.63, 329.63, 392, 523.25],
    pitch: 1.10,
    rate: 0.98
  },
  'profile.html': {
    name: 'Identity Matrix',
    phrase: 'Identity verified. Profile telemetry online.',
    chime: [293.66, 369.99, 440, 587.33],
    pitch: 1.06,
    rate: 0.96
  },
  'explore.html': {
    name: 'Constellation Radar',
    phrase: 'Constellation scanned. Network connections located.',
    chime: [349.23, 440, 523.25, 659.25],
    pitch: 1.12,
    rate: 0.97
  },
  'messages.html': {
    name: 'Sub-space Comms',
    phrase: 'Sub-space relay open. Quantum transmissions ready.',
    chime: [392, 493.88, 587.33, 783.99],
    pitch: 1.08,
    rate: 0.96
  }
};

// Play Musical Celestial Chime for each page
function playPageChime(freqs) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const notes = freqs || [261.63, 329.63, 392];
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      
      gain.gain.setValueAtTime(0.001, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.07, now + idx * 0.05 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.85);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.85);
    });
  } catch (_) {}
}

// Speak pleasant cosmic AI voice for current page
function speakPageVoice(pageKey) {
  const currentKey = pageKey || getCurrentPageKey();
  const config = PAGE_VOICE_CONFIG[currentKey] || PAGE_VOICE_CONFIG['index.html'];

  // Play melodic harmonic chime first
  playPageChime(config.chime);

  // Smooth speech delivery
  if (!('speechSynthesis' in window)) return;

  setTimeout(() => {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(config.phrase);
      
      // Select best smooth natural voice available in system
      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(v => 
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Victoria')) && v.lang.startsWith('en')
      ) || voices.find(v => v.lang.startsWith('en'));

      if (naturalVoice) utterance.voice = naturalVoice;
      utterance.pitch = config.pitch || 1.08;
      utterance.rate = config.rate || 0.96;
      utterance.volume = 0.82;

      window.speechSynthesis.speak(utterance);
    } catch (_) {}
  }, 160);
}

function getCurrentPageKey() {
  const path = window.location.pathname;
  if (path.includes('login.html')) return 'login.html';
  if (path.includes('profile.html')) return 'profile.html';
  if (path.includes('explore.html')) return 'explore.html';
  if (path.includes('messages.html')) return 'messages.html';
  return 'index.html';
}

// Synthesize Smooth Cosmic Gravitational Resonance Sound (NO explosive burst crash)
function playCosmicWarpSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    
    // 1. Warm Gravitational Infall Resonance (subtle deep tone)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(85, now);
    subOsc.frequency.exponentialRampToValueAtTime(42, now + 1.1);
    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.14, now + 0.15);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.25);

    // 2. Celestial Harmonic Shimmer (gentle sine overtone)
    const overtoneOsc = ctx.createOscillator();
    const overtoneGain = ctx.createGain();
    overtoneOsc.type = 'sine';
    overtoneOsc.frequency.setValueAtTime(320, now);
    overtoneOsc.frequency.exponentialRampToValueAtTime(520, now + 0.7);
    overtoneGain.gain.setValueAtTime(0.001, now);
    overtoneGain.gain.linearRampToValueAtTime(0.06, now + 0.1);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
    overtoneOsc.connect(overtoneGain);
    overtoneGain.connect(ctx.destination);
    overtoneOsc.start(now);
    overtoneOsc.stop(now + 1.1);
  } catch (_) {}
}

// Inject Portal Element with the authentic Horizon Black Hole and Setup Listeners on Load
document.addEventListener('DOMContentLoaded', () => {
  setupTransitionPortal();
  setupPageLinkIntercepts();
  setupToastContainer();

  // Load speech synthesis voices
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {};
  }

  // Bind shiny vibrating black hole clicks on all pages (including login)
  document.querySelectorAll('.shiny-blackhole-vibrating, #login-brand-blackhole').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.classList.contains('shiny-blackhole-vibrating') ? el : el.querySelector('.shiny-blackhole-vibrating');
      if (target) {
        target.classList.add('pulse-active');
        setTimeout(() => target.classList.remove('pulse-active'), 800);
      }
      playCosmicWarpSound();
      speakPageVoice();
    });
  });

  // Inject Voice Telemetry Button in Navigation / Header
  injectVoiceButton();

  // Announce page arrival with pleasant voice after brief visual reveal
  setTimeout(() => {
    speakPageVoice();
  }, 450);
});

function injectVoiceButton() {
  if (document.getElementById('cosmic-voice-toggle-btn')) return;
  const container = document.querySelector('nav .right-header-controls') || document.querySelector('nav .flex.items-center.gap-2\\.5') || document.querySelector('nav .flex.items-center:last-child');
  if (!container) return;

  const btn = document.createElement('button');
  btn.id = 'cosmic-voice-toggle-btn';
  btn.type = 'button';
  btn.className = 'px-2.5 py-1.5 rounded-xl bg-void-900 border border-void-border text-gray-300 hover:text-amber-300 hover:border-amber-400/50 transition-all text-xs font-mono flex items-center gap-1.5 shadow-sm';
  btn.title = 'Replay Page Cosmic Voice & Chime';
  btn.innerHTML = '<i class="fa-solid fa-volume-high text-amber-400 text-xs animate-pulse"></i><span class="hidden xl:inline text-[11px]">Voice</span>';

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    speakPageVoice();
    if (window.showToast) {
      const pageKey = getCurrentPageKey();
      const cfg = PAGE_VOICE_CONFIG[pageKey] || PAGE_VOICE_CONFIG['index.html'];
      window.showToast(`${cfg.name}: "${cfg.phrase}"`, 'info', 3000);
    }
  });

  // Insert before power off button
  const exitBtn = container.querySelector('a[href="login.html"]');
  if (exitBtn) {
    container.insertBefore(btn, exitBtn);
  } else {
    container.appendChild(btn);
  }
}

function setupTransitionPortal() {
  let portal = document.getElementById('page-transition-portal');
  if (!portal) {
    portal = document.createElement('div');
    portal.id = 'page-transition-portal';
    portal.innerHTML = `
      <div class="portal-stage-container">
        <div class="blackhole-stage" aria-label="Animated Horizon Black Hole illustration with orbiting satellite">
          <div class="star-drift star-drift-one"></div>
          <div class="star-drift star-drift-two"></div>
          <div class="orbit orbit-one"></div>
          <div class="orbit orbit-two"></div>
          <div class="accretion accretion-back"></div>
          <div class="event-horizon"><div class="horizon-core"></div></div>
          <div class="accretion accretion-front"></div>
          <div class="void-station void-station-app">
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
      </div>
      <div class="portal-status-caption">
        <span class="portal-status-dot"></span>
        <span>EVENT HORIZON // QUANTUM HORIZON TRANSIT</span>
      </div>
    `;
    document.body.appendChild(portal);
  }

  // Ensure portal is hidden upon arrival on destination page
  // ZERO lingering after-image on newly loaded page
  portal.classList.remove('active-warp');
}

// Intercept local page links for smooth Horizon Black Hole Transition
function setupPageLinkIntercepts() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('javascript') && !href.startsWith('http') && !href.startsWith('mailto')) {
      e.preventDefault();
      triggerWarpTransition(href);
    }
  });
}

// Trigger Smooth Horizon Black Hole Transition (No bursted supernova blast)
function triggerWarpTransition(targetUrl) {
  // 1. Play smooth celestial gravitational resonance sound
  playCosmicWarpSound();

  const portal = document.getElementById('page-transition-portal');
  if (!portal) {
    window.location.href = targetUrl;
    return;
  }

  // Reset and activate CSS animation via reflow
  portal.classList.remove('active-warp');
  void portal.offsetWidth;
  portal.classList.add('active-warp');

  // Navigate after smooth transit (~1.25s)
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 1250);
}

window.navigateToPage = triggerWarpTransition;
window.playWarpSound = playCosmicWarpSound;
window.playBurstSound = playCosmicWarpSound;
window.speakPageVoice = speakPageVoice;
window.PAGE_VOICE_CONFIG = PAGE_VOICE_CONFIG;

function setupToastContainer() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
}

/**
 * Toast Notification System
 */
window.showToast = function(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container') || document.body;
  const toast = document.createElement('div');
  toast.className = `void-toast toast-${type} flex items-start gap-3`;

  let iconHtml = '<i class="fa-solid fa-circle-info text-cyan-400 mt-1"></i>';
  if (type === 'error') {
    iconHtml = '<i class="fa-solid fa-triangle-exclamation text-rose-500 mt-1"></i>';
  } else if (type === 'success') {
    iconHtml = '<i class="fa-solid fa-shield-halved text-emerald-400 mt-1"></i>';
  }

  toast.innerHTML = `
    ${iconHtml}
    <div class="flex-1">
      <div class="text-[10px] uppercase tracking-wider font-mono text-gray-400 mb-0.5">
        ${type === 'error' ? 'Notice / Barrier' : (type === 'success' ? 'Confirmed' : 'VoidLink Notice')}
      </div>
      <div class="text-xs text-gray-200 leading-snug font-medium">${message}</div>
    </div>
    <button class="text-gray-500 hover:text-white text-xs ml-2" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250);
  }, duration);
};
