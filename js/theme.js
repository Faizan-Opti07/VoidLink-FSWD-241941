/**
 * VACUUM IN THE VOID - 10 COSMIC THEMES SYSTEM
 * Red Crimson, Lavender Black Hole, Grey Black Hole, White, Orange, Green, Aqua, + Gold, Sapphire, Cyber Neon
 */

const THEMES_CONFIG = [
  { id: 'grey', name: 'Grey Black Hole', desc: 'Obsidian Titanium Void', color: '#14141d', accent: '#a5a5b8' }, // Default
  { id: 'crimson', name: 'Red Crimson', desc: 'Relativistic Crimson Horizon', color: '#1a080c', accent: '#f43f5e' }, // Crimson
  { id: 'lavender', name: 'Lavender Black Hole', desc: 'Singularity Violet Flare', color: '#13091e', accent: '#c084fc' }, // Lavender
  { id: 'white', name: 'White', desc: 'Supernova White Hole', color: '#f5f5f7', accent: '#0284c7' }, // White
  { id: 'orange', name: 'Orange', desc: 'Solar Accretion Flare', color: '#1c0e05', accent: '#f97316' }, // Orange
  { id: 'green', name: 'Green', desc: 'Aurora Emerald Matrix', color: '#051810', accent: '#10b981' }, // Green
  { id: 'aqua', name: 'Aqua', desc: 'Sub-space Cyan Pulse', color: '#04161e', accent: '#06b6d4' }, // Aqua
  { id: 'gold', name: 'Relativistic Gold', desc: 'Photon Sphere Radiance', color: '#1a1405', accent: '#fbbf24' }, // Gold
  { id: 'sapphire', name: 'Midnight Sapphire', desc: 'Deep Cosmic Blue', color: '#070f24', accent: '#3b82f6' }, // Sapphire
  { id: 'cyber', name: 'Cyber Neon', desc: 'Quantum Ultraviolet', color: '#12041c', accent: '#ec4899' } // Cyber
];

const THEME_STORAGE_KEY = 'connecfriend_active_theme'; // Key

// Get currently stored theme
function getActiveTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) || 'grey'; // Default to grey
}

// Apply theme to document
function setActiveTheme(themeId) {
  const theme = THEMES_CONFIG.find(t => t.id === themeId) || THEMES_CONFIG[0]; // Match
  localStorage.setItem(THEME_STORAGE_KEY, theme.id); // Save

  // Set data-theme on html and body
  document.documentElement.setAttribute('data-theme', theme.id); // Set HTML
  document.body.setAttribute('data-theme', theme.id); // Set Body

  // Dispatch custom event for canvas black hole and other components
  window.dispatchEvent(new CustomEvent('voidThemeChanged', { detail: theme }));

  // Update theme trigger button indicator if present
  const indicator = document.getElementById('active-theme-swatch');
  if (indicator) indicator.style.backgroundColor = theme.accent;

  const nameLabel = document.getElementById('active-theme-name');
  if (nameLabel) nameLabel.textContent = theme.name;
}

// Initialize Theme on DOM Ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const current = getActiveTheme(); // Fetch
    setActiveTheme(current); // Apply immediately
    injectThemeSwitcherUI(); // Render selector button & dropdown
  });
}

// Inject Theme Changer Button & Dropdown Menu into Navigation
function injectThemeSwitcherUI() {
  const host = document.getElementById('theme-switcher-mount');
  if (!host) return;

  // Avoid duplicate injection
  if (document.getElementById('void-theme-selector-wrapper')) return;

  const current = getActiveTheme();
  const currentTheme = THEMES_CONFIG.find(t => t.id === current) || THEMES_CONFIG[0];

  const wrapper = document.createElement('div');
  wrapper.id = 'void-theme-selector-wrapper';
  wrapper.className = 'relative inline-block text-left z-50';

  const isBottomMount = host.id === 'theme-switcher-mount' && (host.classList.contains('bottom-4') || window.location.pathname.includes('login.html'));
  const menuPositionClass = isBottomMount ? 'bottom-full mb-2' : 'mt-2';

  wrapper.innerHTML = `
    <button 
      id="theme-dropdown-btn" 
      type="button" 
      class="flex items-center gap-2 px-3 py-2 rounded-xl bg-void-900/95 hover:bg-void-850 border border-white/20 text-xs font-mono text-gray-200 transition-all shadow-xl backdrop-blur-md"
      title="Switch Theme (10 Cosmic Variations)"
    >
      <span id="active-theme-swatch" class="w-3 h-3 rounded-full border border-white/20 shadow-sm" style="background-color: ${currentTheme.accent};"></span>
      <span class="text-[9px] font-mono tracking-widest text-gray-400 uppercase hidden sm:inline">THEME</span>
      <span id="active-theme-name" class="text-xs font-bold">${currentTheme.name}</span>
      <i class="fa-solid fa-chevron-up text-[9px] text-gray-400"></i>
    </button>

    <div 
      id="theme-dropdown-menu" 
      class="hidden absolute right-0 ${menuPositionClass} w-64 rounded-2xl glass-panel border border-white/10 shadow-2xl p-2.5 space-y-1 z-50 max-h-96 overflow-y-auto backdrop-blur-xl"
    >
      <div class="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-gray-400 border-b border-gray-800/80 mb-1 flex items-center justify-between">
        <span>Cosmic Themes (10)</span>
        <i class="fa-solid fa-circle-half-stroke text-amber-400"></i>
      </div>
      <div class="grid grid-cols-1 gap-1">
        ${THEMES_CONFIG.map(t => `
          <button 
            type="button" 
            onclick="setActiveTheme('${t.id}')"
            class="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left hover:bg-white/5 transition-all text-xs font-mono text-gray-200 group border border-transparent hover:border-white/10"
          >
            <span class="w-3.5 h-3.5 rounded-full flex-shrink-0 border border-white/30 shadow-sm group-hover:scale-110 transition-transform" style="background-color: ${t.accent};"></span>
            <div class="flex-1 min-w-0">
              <div class="font-bold text-[11px] truncate text-gray-100">${t.name}</div>
              <div class="text-[9px] text-gray-400 truncate">${t.desc}</div>
            </div>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Prepend before user avatar or append to host
  host.insertBefore(wrapper, host.firstChild);

  // Toggle dropdown menu
  const btn = wrapper.querySelector('#theme-dropdown-btn');
  const menu = wrapper.querySelector('#theme-dropdown-menu');

  if (btn && menu) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        menu.classList.add('hidden');
      }
    });
  }
}

// Make globally accessible
window.setActiveTheme = setActiveTheme;
window.THEMES_CONFIG = THEMES_CONFIG;
