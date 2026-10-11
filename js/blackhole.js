/**
 * VOIDLINK • DUAL BINARY BLACK HOLE PHYSICS ENGINE
 * Main Gargantua Singularity + Continuously Orbiting Micro Black Hole with Accretion Wake
 */

class BinaryBlackHoleSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId); // Canvas DOM element
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d'); // 2D Rendering context
    this.particles = []; // Accretion disk particle array
    this.stars = []; // Distant background stars
    this.particleCount = 520; // Dense particle stream
    this.starCount = 180; // Cosmic background star count
    this.time = 0; // Animation clock
    this.mouseX = 0; // Interactive mouse X
    this.mouseY = 0; // Interactive mouse Y
    this.targetMouseX = 0; // Smooth lerp target
    this.targetMouseY = 0; // Smooth lerp target

    // Micro Black Hole (Small orbiting secondary singularity)
    this.microHole = {
      angle: 0, // Orbital angle
      speed: 0.018, // Orbital speed
      radiusFactor: 1.85, // Distance ratio from primary center
      size: 16, // Radius of micro black hole
      trail: [] // Micro accretion wake
    };

    // Active Theme Palette
    this.currentThemeId = localStorage.getItem('connecfriend_active_theme') || 'grey';

    this.initCanvasSize();
    this.initStars();
    this.initParticles();
    this.bindEvents();
    this.animate();
  }

  // Handle responsive canvas sizing
  initCanvasSize() {
    this.dpr = window.devicePixelRatio || 1;
    this.width = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : window.innerWidth;
    this.height = this.canvas.parentElement ? this.canvas.parentElement.clientHeight : window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';

    this.ctx.scale(this.dpr, this.dpr);
    
    // In login.html, shift slightly to left so aside console fits cleanly
    const isLogin = window.location.pathname.includes('login.html');
    this.centerX = isLogin && this.width > 768 ? this.width * 0.38 : this.width / 2;
    this.centerY = this.height / 2;
    this.singularityRadius = Math.min(this.width, this.height) * 0.13; // Primary event horizon
    this.microHole.size = Math.max(12, this.singularityRadius * 0.28); // Proportional micro hole size
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01
      });
    }
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      const distance = this.singularityRadius * (1.2 + Math.pow(Math.random(), 1.8) * 3.8);
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.sqrt(this.singularityRadius / distance) * 0.024) + 0.003;

      this.particles.push({
        r: distance,
        angle: angle,
        speed: speed,
        size: Math.random() * 2.2 + 0.8,
        z: (Math.random() - 0.5) * 20
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.initCanvasSize());

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.targetMouseX = (e.clientX - rect.left) - this.centerX;
      this.targetMouseY = (e.clientY - rect.top) - this.centerY;
    });

    window.addEventListener('voidThemeChanged', (e) => {
      if (e.detail && e.detail.id) {
        this.currentThemeId = e.detail.id;
      }
    });
  }

  getThemeRGB(isApproaching) {
    const theme = this.currentThemeId;
    if (theme === 'crimson') return isApproaching ? [255, 90, 110] : [180, 20, 50];
    if (theme === 'lavender') return isApproaching ? [216, 180, 254] : [147, 51, 234];
    if (theme === 'green') return isApproaching ? [110, 255, 180] : [16, 140, 70];
    if (theme === 'aqua') return isApproaching ? [100, 240, 255] : [6, 140, 190];
    if (theme === 'orange') return isApproaching ? [255, 170, 70] : [220, 80, 20];
    if (theme === 'white') return isApproaching ? [255, 255, 255] : [120, 180, 240];
    if (theme === 'gold') return isApproaching ? [255, 225, 90] : [210, 140, 20];
    if (theme === 'sapphire') return isApproaching ? [120, 190, 255] : [30, 80, 220];
    if (theme === 'cyber') return isApproaching ? [255, 80, 180] : [140, 20, 230];
    return isApproaching ? [250, 190, 70] : [180, 80, 220];
  }

  drawStars() {
    for (let star of this.stars) {
      const dx = star.x - this.centerX;
      const dy = star.y - this.centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.singularityRadius * 0.95) continue;

      let drawX = star.x;
      let drawY = star.y;

      if (dist < this.singularityRadius * 3) {
        const factor = (this.singularityRadius * 1.5) / dist;
        drawX += (dx / dist) * factor * 14;
        drawY += (dy / dist) * factor * 14;
      }

      const pulse = Math.sin(this.time * star.twinkleSpeed) * 0.2 + 0.8;
      this.ctx.fillStyle = `rgba(220, 225, 240, ${star.alpha * pulse})`;
      this.ctx.beginPath();
      this.ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  drawAccretionDisk() {
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    const cx = this.centerX + this.mouseX * 0.03;
    const cy = this.centerY + this.mouseY * 0.03;

    const tilt = 0.38;
    const diskAngle = -0.15;

    // Orbiting position of the Micro Black Hole
    this.microHole.angle += this.microHole.speed;
    const microOrbitR = this.singularityRadius * this.microHole.radiusFactor;
    const microUnrotatedX = Math.cos(this.microHole.angle) * microOrbitR;
    const microUnrotatedY = Math.sin(this.microHole.angle) * microOrbitR * tilt;
    const microX = cx + microUnrotatedX * Math.cos(diskAngle) - microUnrotatedY * Math.sin(diskAngle);
    const microY = cy + microUnrotatedX * Math.sin(diskAngle) + microUnrotatedY * Math.cos(diskAngle);

    // Save trail for micro black hole wake
    this.microHole.trail.push({ x: microX, y: microY, alpha: 0.8 });
    if (this.microHole.trail.length > 22) this.microHole.trail.shift();

    for (let p of this.particles) {
      p.angle += p.speed;

      const cosA = Math.cos(p.angle);
      const sinA = Math.sin(p.angle);

      const unrotatedX = cosA * p.r;
      const unrotatedY = sinA * p.r * tilt + p.z;

      const px = cx + unrotatedX * Math.cos(diskAngle) - unrotatedY * Math.sin(diskAngle);
      const py = cy + unrotatedX * Math.sin(diskAngle) + unrotatedY * Math.cos(diskAngle);

      const isApproaching = sinA < 0;
      const dopplerFactor = 1.0 - sinA * 0.45;

      const rgb = this.getThemeRGB(isApproaching);
      let r = rgb[0], g = rgb[1], b = rgb[2], alpha = 0.8;

      if (p.r < this.singularityRadius * 1.5) {
        r = 255; g = 250; b = 240; alpha = 0.95;
      }

      alpha = Math.max(0.05, Math.min(1, alpha * dopplerFactor));

      const dToCenter = Math.hypot(px - cx, py - cy);
      if (unrotatedY < 0 && dToCenter < this.singularityRadius * 0.96) {
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(px, py, p.size * (dopplerFactor * 0.8 + 0.4), 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      this.ctx.fill();
    }

    // DRAW THE SECONDARY MICRO BLACK HOLE (Orbiting inside all the time)
    this.drawMicroBlackHole(microX, microY, microUnrotatedY);
  }

  // Draw the second small moving black hole
  drawMicroBlackHole(mx, my, unrotatedY) {
    const ms = this.microHole.size;
    const rgb = this.getThemeRGB(true);

    // Micro black hole wake / relativistic particle tail
    for (let i = 0; i < this.microHole.trail.length; i++) {
      const pt = this.microHole.trail[i];
      const trailAlpha = (i / this.microHole.trail.length) * 0.35;
      this.ctx.beginPath();
      this.ctx.arc(pt.x, pt.y, ms * (0.8 + i * 0.05), 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${trailAlpha})`;
      this.ctx.fill();
    }

    // Micro photon sphere glow halo
    const haloGrad = this.ctx.createRadialGradient(mx, my, ms * 0.8, mx, my, ms * 2.2);
    haloGrad.addColorStop(0, `rgba(255, 255, 255, 0.95)`);
    haloGrad.addColorStop(0.3, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.8)`);
    haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = haloGrad;
    this.ctx.beginPath();
    this.ctx.arc(mx, my, ms * 2.2, 0, Math.PI * 2);
    this.ctx.fill();

    // Micro event horizon core (pure black)
    this.ctx.beginPath();
    this.ctx.arc(mx, my, ms, 0, Math.PI * 2);
    this.ctx.fillStyle = '#000000';
    this.ctx.fill();

    // Razor micro photon ring
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.arc(mx, my, ms, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  drawSingularityCore() {
    const cx = this.centerX + this.mouseX * 0.03;
    const cy = this.centerY + this.mouseY * 0.03;
    const sr = this.singularityRadius;

    // Primary Photon Ring Halo
    const haloGrad = this.ctx.createRadialGradient(cx, cy, sr * 0.95, cx, cy, sr * 1.55);
    haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    haloGrad.addColorStop(0.15, 'rgba(251, 191, 36, 0.7)');
    haloGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.25)');
    haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = haloGrad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, sr * 1.55, 0, Math.PI * 2);
    this.ctx.fill();

    // Primary Event Horizon Core (Black void)
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, sr * 0.98, 0, Math.PI * 2);
    this.ctx.fillStyle = '#000000';
    this.ctx.fill();

    // Razor Sharp Photon Ring Edge
    this.ctx.lineWidth = 2.0;
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, sr, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  animate() {
    this.time += 1;

    const isWhiteTheme = this.currentThemeId === 'white';
    this.ctx.fillStyle = isWhiteTheme ? '#f1f5f9' : '#050508';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.drawStars();
    this.drawAccretionDisk();
    this.drawSingularityCore();

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('blackhole-canvas')) {
    window.blackHoleEngine = new BinaryBlackHoleSimulator('blackhole-canvas');
  }
});
