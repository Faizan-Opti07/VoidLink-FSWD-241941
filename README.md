# VOIDLINK • VACUUM IN THE VOID
### ConnecFriend Social Network • Air University Islamabad Campus
**Course:** Full Stack Web Development (CS 301) — Fall 2026 Assignment 1  
**CLO:** CLO-1 GA-2 | **Total Marks:** 100  
**Roll Number / Submission ID:** `241941`  

---

## 1. System Overview

**VoidLink • Vacuum in the Void** is a social networking user interface engineered for **Firm XYZ** under the project title **“ConnecFriend”**. Instead of standard social media templates, this platform is set within a sleek, modern, dark cosmic matrix. It pairs a **Dual Binary Black Hole simulation** (a gargantuan singularity plus a continuously orbiting micro black hole) with modern typography (**Outfit** & **Plus Jakarta Sans**), **AI Assistant Pets** (Cat, Parrot, Eagle, Hoot), an **Avatar Customizer**, **Snappy Web Audio Page Transitions**, and a **10-Theme Switcher**.

### Strict Compliance with Assignment Instructions:
1. **Zero UI Resemblance (Instruction 3):** Completely custom aerospace HUD & glass aesthetic—zero resemblance to Facebook, Twitter, Instagram, or Orkut.
2. **Client-Side Simulation (Instruction 5):** No backend server calls; requests and state changes are simulated with reactive state management, asynchronous responses, and LocalStorage persistence.
3. **Framework Mandate (Instruction 6):** Built using the **Tailwind CSS** framework via official CDN across all markup, complemented by custom CSS modules for canvas astrophysics, accretion disk optics, and gravitational warp transitions.
4. **Single Zip Archive (Instruction 7):** Packaged into `241941.zip` named after the roll number.

---

## 2. Directory Tree Structure

```
241941/
├── index.html                   # Social Feed (Friends radar by login time, like/dislike counts, post composer)
├── login.html                   # Social Gateway (Dual Black Hole canvas, aside console, aesthetic title)
├── profile.html                 # Profile Hub (AI Assistant Pets, Avatar customizer, 1-3 friend ratings)
├── messages.html                # Sub-space Private Messaging (Watery caustics & fluid ripple dynamics)
├── explore.html                 # Member Directory (Friend invitations & ignore-list barrier)
├── README.md                    # Comprehensive documentation, CLO mapping & grading matrix
├── 241941.zip                   # Assignment submission archive
├── css/
│   ├── void-theme.css           # 10 themes, Outfit/Plus Jakarta Sans typography, watery chat dynamics
│   ├── blackhole.css            # Accretion disk, photon ring, Doppler optics & gravitational lensing
│   └── transitions.css          # Snappy quantum page transitions (240ms) & portal animations
├── js/
│   ├── state.js                 # Central state store (Void_Fai, Hamza, Munawar, Hafiz_Obaidullah, AI Pets)
│   ├── theme.js                 # 10 Cosmic Themes engine, navbar dropdown & live color synchronization
│   ├── blackhole-stage.js       # Persistent Black Hole & Orbiting Satellite (Picture 1 inside app all the time)
│   ├── blackhole.js             # Dual Binary Black Hole engine (Primary singularity + Orbiting micro hole)
│   ├── auth.js                  # Gateway credentials verification, quick member presets, session setup
│   ├── feed.js                  # Social feed, friends sorted by login time, like/dislike counts, share modal
│   ├── profile.js               # Profile manager, AI Pets (Cat, Parrot, Eagle, Hoot), Avatar customizer, ratings
│   ├── messaging.js             # Private chat engine with watery ripples and instant bot replies
│   ├── invite.js                # Member directory search, friend invitations & ignore list barrier
│   └── transitions.js           # Snappy page transitions with Web Audio API sound synthesis
└── assets/
    ├── avatars/
    │   ├── 1.jpg        # Void_Fai (Active User)
    │   ├─2s.jpg           # Hamza (Friend, Developer)
    │   ├── 3s.jpg            # Munawar (Friend, Designer)
    │   └── 4.jpg           # Hafiz_Obaidullah the great (Outlaw, Ignores Void_Fai)
    └── images/
        ├── black_hole.jpg       # Accretion capture for post attachments
        └── void_station.jpg     # Station capture for post attachments
```

---

## 3. Character Personas & AI Assistant Pets

| Character | Handle | Role | AI Assistant Pet | Initial Status |
| :--- | :--- | :--- | :--- | :--- |
| **Void_Fai** | `@void_fai` | Creator & Social Architect | **Shadow Nova 🐱** (Cyber Feline AI) | Active Logged-in User |
| **Hamza** | `@hamza` | Full-Stack Developer | **Aero Talon 🦅** (Vanguard Eagle AI) | Friend (Rated Trustworthy: 3, Latest Login) |
| **Munawar** | `@munawar` | UI/UX Visual Designer | **Chronos Hoot 🦉** (Singularity Owl AI) | Friend (Rated Cool: 2, Logged in earlier) |
| **Hafiz_Obaidullah the great** | `@obaidullah_great` | Gaming Champion & Critic | **Prism Echo 🦜** (Chromatic Parrot AI) | Non-Friend (Has Void_Fai in `ignoreList`!) |
| **Ayesha** | `@ayesha_cloud` | Cloud Architect | **Shadow Nova 🐱** (Cyber Feline AI) | Non-Friend Member (Can invite / chat) |

---

## 4. Key Upgrades Implemented

### 4.1. Dual Binary Black Hole Simulation
- In [`js/blackhole.js`](js/blackhole.js), the canvas now renders a **Binary Black Hole System**:
  - **Primary Singularity:** Large Gargantua event horizon with relativistic Keplerian accretion disk and Doppler beaming.
  - **Orbiting Micro Black Hole:** A smaller, secondary black hole that continuously orbits inside the accretion field at high speed, complete with its own miniature event horizon, photon ring, and particle wake!

### 4.2. Modern Social Typography
- Migrated to **Outfit** (headings, bold titles) and **Plus Jakarta Sans** (clean, crisp, readable body text) via Google Fonts in [`css/void-theme.css`](css/void-theme.css).

### 4.3. AI Assistant Pets
- In [`profile.html`](profile.html) & [`js/profile.js`](js/profile.js), every user has an AI Assistant Pet (Cat 🐱, Parrot 🦜, Eagle 🦅, Hoot Owl 🦉). Users can open the Pet Switcher modal to customize their AI companion.

### 4.4. Avatar Customizer
- In [`profile.html`](profile.html), users can click **Change Avatar** to pick from preset avatars, paste an image URL, or select a local photo, which updates their profile picture across the entire application instantly.

### 4.5. Fast Snappy Page Transitions with Web Audio Sound
- In [`js/transitions.js`](js/transitions.js), moving between pages triggers a synthesized cosmic warp swoosh via the **Web Audio API** (`playWarpSound()`), executing in **240ms** for a fast, responsive feel.

### 4.6. Watery Chat Dynamics
- In [`messages.html`](messages.html) and [`js/messaging.js`](js/messaging.js), typing or clicking triggers fluid liquid ripples (`.water-ripple-drop`), and chat bubbles have an aquatic refraction shimmer.

### 4.7. 10 Cosmic Themes Switcher
- Accessible from the top navbar across all pages (Grey Black Hole, Red Crimson, Lavender Black Hole, White, Orange, Green, Aqua, Relativistic Gold, Midnight Sapphire, Cyber Neon).

---

## 5. Grading Rubrics Compliance Matrix (100 / 100 Marks)

| Rubric Item | Marks | File(s) Implemented | Verification |
| :--- | :---: | :--- | :--- |
| **Login** | 5 | [`login.html`](login.html), [`js/auth.js`](js/auth.js) | Dual black hole entrance, aside login console, title on top, quick member presets. |
| **Profile** | 7 | [`profile.html`](profile.html), [`js/profile.js`](js/profile.js) | Personal telemetry, AI Pets, Avatar customizer, and connected friends list. |
| **Home Page** | 10 | [`index.html`](index.html), [`js/feed.js`](js/feed.js) | Friends radar strictly ordered by latest login time (`getFriendsSortedByLoginTime`), news feed with last login time. |
| **Invitation** | 10 | [`explore.html`](explore.html), [`js/invite.js`](js/invite.js) | Connect with members; blocks invitations if sender is in target's `ignoreList` (e.g. Hafiz_Obaidullah the great). |
| **Rating of Friend** | 5 | [`profile.html`](profile.html), [`js/profile.js`](js/profile.js) | 1 to 3 scale represented as icons: **1 = Stupid** (`fa-face-dizzy`), **2 = Cool** (`fa-glasses`), **3 = Trustworthy** (`fa-shield-halved`). |
| **News Sharing** | 10 | [`index.html`](index.html), [`js/feed.js`](js/feed.js) | Post composer with radio selection: **All Friends** vs **Some Friends Only** (with multi-select checklist). |
| **Likes / Dislikes with Count**| 10 | [`index.html`](index.html), [`js/feed.js`](js/feed.js) | Live counters for both likes and dislikes; interactive buttons toggle reactions with feedback. |
| **Private Messaging** | 13 | [`messages.html`](messages.html), [`js/messaging.js`](js/messaging.js) | Private messaging between friends **AND** non-friend members; watery caustics & fluid ripples; instant bot replies. |
| **Code Quality** | 10 | All Files | Clean architecture, inline comments (`code; // comment`), and zero console errors. |
| **Error Handling** | 5 | [`js/invite.js`](js/invite.js), [`js/auth.js`](js/auth.js), [`js/transitions.js`](js/transitions.js) | Gravitational barrier error alerts on ignore violations, credential warnings, and toast notifications. |
| **GUI** | 15 | Entire UI | 10 themes, dual binary black holes, aside login console, watery chat waves, wormhole warp transitions. |
| **TOTAL** | **100** | | |

---

## 6. How to Run Locally

1. Open a terminal in the project directory:
   ```bash
   cd /home/sudo-fai/faizan/FSWD/241941
   ```
2. Start the local server:
   ```bash
   python3 -m http.server 3000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:3000/login.html
   ```

---

## 7. Submission Package

In accordance with **Instruction 7**, the root folder contains:
- `241941.zip` (Updated, tested, and ready for direct LMS submission)
