# Vacuum in the Void — ConnecFriend

A dark, cinematic, black-hole-inspired **social networking interface** created for the Fall 2026 Full Stack Web Development Assignment 1. The assignment's required service name, **ConnecFriend**, remains visible in the interface; **Vacuum in the Void** is the creative visual identity.

> This is a front-end-only demonstration. It makes no server calls. Interactions are simulated in the browser.

## Contents

- [Features](#features)
- [Project tree](#project-tree)
- [How to run](#how-to-run)
- [Demo sign-in](#demo-sign-in)
- [How the code works](#how-the-code-works)
- [Assignment checklist](#assignment-checklist)
- [Customization](#customization)
- [Before submission](#before-submission)

## Features

- **Black-hole entrance:** animated event horizon, orbit rings, glowing accretion disk, star particles, and cinematic sign-in panel.
- **Animated page changes:** a horizon-sweep overlay plays when moving between pages.
- **Home feed:** friends' posts show names, avatars, updates, time since last login, like/dislike counts, and reaction buttons.
- **Feed order:** posts are sorted by the author's last-login value, most recent first.
- **Sharing:** create a post for all friends or choose specific friends.
- **Profile:** personal information, profile image, and a list of friends.
- **Friend ratings:** choose exactly one of the assignment's levels — 1 Stupid, 2 Cool, 3 Trustworthy — with icon-like symbols.
- **Invitations:** invite a member. If that member's ignore list includes the signed-in user, the invitation is blocked with a clear message.
- **Private messaging:** choose any listed member, friend or not, and send local demo messages.
- **Responsive layout:** adapts to desktop, tablet, and mobile sizes.
- **Reduced motion:** respects the operating system's `prefers-reduced-motion` preference.
- **Local demo state:** posts, ratings, invitations, and messages are stored in browser `localStorage`.

## Project tree

```text
Vacuum in the Void_ConnecFriend/
├── index.html             # Animated entrance + login form
├── home.html              # Feed, composer, reactions, latest-login ordering
├── profile.html           # Personal profile + friend ratings
├── connections.html       # Member directory + invitation logic
├── messages.html          # Private messages to any member
├── PLAN.md                # Planning document and rubric-to-feature map
├── README.md              # This guide
├── css/
│   └── theme.css          # Bootstrap-supported theme, layout, and animations
└── js/
    ├── data.js            # Demo people, posts, state, escaping, time labels
    ├── ui.js              # Shared navigation animation and user details
    ├── login.js            # Login validation and local session
    ├── home.js             # Feed, sharing audience, likes/dislikes
    ├── profile.js          # Friend cards and ratings
    ├── connections.js      # Search, invitations, ignore-list protection
    └── messages.js         # Local-only private messages
```

## How to run

1. Extract the ZIP into a normal folder.
2. Open `index.html` in a modern browser.
3. For the most consistent behavior, use VS Code's **Live Server** extension and choose **Open with Live Server**. No backend or build step is needed.
4. Use the navigation icons to visit Home, Profile, Connections, and Messages.

Bootstrap and Bootstrap Icons are loaded from CDNs, and profile photos are loaded from Unsplash URLs. Those visual assets need an internet connection. The main layout and motion are in `css/theme.css`.

## Demo sign-in

- **Username:** `alex`
- **Password:** any non-empty value

This is only a classroom UI simulation, not real authentication. The login form checks that fields are present and that the username exists in the local demo directory. There is no registration page.

Other seeded usernames appear in `js/data.js` (for example `mayachen`, `noahw`, and `zaraa`).

## How the code works

### 1. HTML pages
Each feature has its own HTML file. The pages share the same sidebar, navigation, visual language, and script-loading pattern. That makes the project easier to read and edit than putting everything in one large file.

### 2. `css/theme.css`
The stylesheet contains:
- color variables in `:root`;
- reusable glass panels, buttons, input styles, and text styles;
- the CSS black-hole / accretion-ring illustration;
- the page-transition overlay and entrance animation;
- page-specific layouts;
- responsive breakpoints;
- reduced-motion support.

The black hole is drawn with CSS shapes and gradients, so no heavy animation library is required.

### 3. `js/data.js`
This is the tiny local data layer. It seeds example people and posts, reads/writes state using `localStorage`, and provides helper functions. It does **not** contact a server.

### 4. `js/ui.js`
This file contains shared UI behavior:
- animated navigation before changing pages;
- setting the current member's name and avatar;
- a small helper for status and error messages;
- respecting reduced-motion preferences.

### 5. Feature scripts
- `login.js` checks required fields and starts the demo session.
- `home.js` draws the feed, sorts it by most recent friend login, adds posts, and updates reaction counts.
- `profile.js` draws friends and saves ratings.
- `connections.js` searches members and blocks invitation attempts when the target ignores the sender.
- `messages.js` stores and displays private messages for any member in the directory.

### 6. State and reset
The app stores its state under the browser `localStorage` key `voidlink-state`. To reset the demo, open browser developer tools, find **Application / Storage → Local Storage**, and delete `voidlink-state` and `voidlink-session`, then refresh the page.

## Assignment checklist

| Assignment requirement | Implemented in |
|---|---|
| Login for an existing user; no registration | `index.html`, `js/login.js` |
| Profile with personal info, picture, and friends | `profile.html`, `js/profile.js` |
| Home feed with friend name, picture, news, last-login time | `home.html`, `js/home.js` |
| Latest friend login appears first | `js/home.js` feed sorting |
| Invitations to connect | `connections.html`, `js/connections.js` |
| Prevent invitation if recipient ignores sender | `js/connections.js`, seeded example member `owen` |
| Rating 1–3: Stupid, Cool, Trustworthy | `profile.html`, `js/profile.js` |
| Share with all friends or selected friends | `home.html`, `js/home.js` |
| Like/dislike with counts | `home.html`, `js/home.js` |
| Private messages to friends and other members | `messages.html`, `js/messages.js` |
| No server calls | All interactions use local demo data |
| Bootstrap/Tailwind/Less requirement | Bootstrap 5 CSS and Bootstrap Icons CDN |
| Multiple files and code clarity | Separate HTML, CSS, and JS files |

## Customization

- **Colors:** edit the variables at the top of `css/theme.css`.
- **Demo members/posts:** edit the arrays in `js/data.js`.
- **Entrance animation:** search for `Entrance and animated event horizon` in `css/theme.css`.
- **Page transitions:** edit `navigateWithTransition()` in `js/ui.js`.
- **Demo username:** update the seeded people in `js/data.js`.

## Before submission

- Test every item in the assignment checklist.
- Test mobile width and keyboard use.
- Confirm there are no JavaScript errors in the browser console.
- Ensure CDN-loaded fonts, icons, and photos display when online.
- Rename the final ZIP to **your actual roll number** as required by the assignment. The generated filename uses a placeholder and must not be submitted unchanged.
- Review and understand the code before submitting; the assignment is individual work.

## Live event horizon and themes

The event horizon continues rotating behind the content on every page, including after login. The app also includes a drifting star field, pointer-following accent glow, subtle panel sweeps, hover lift and glow, button shine/ripple effects, animated page entrances, and motion-reduction support. Use the **THEME** selector in the top bar on app pages or the floating selector on the login page. Your selection is saved in this browser and carries across pages. Available themes: Void Original, Reddish Black Hole, Lavender, Pinko, Whitist / Arctic White, Black Grey / Graphite, Nebula Blue, Emerald Pulse, Solar Amber.


## Latest visual updates
- Product hero renamed to **Vacuum in the Void**.
- Login and sign-out use prominent power-button styling.
- Page navigation zooms through an animated black-hole event horizon.
- A second animated black hole appears on logged-in pages.
