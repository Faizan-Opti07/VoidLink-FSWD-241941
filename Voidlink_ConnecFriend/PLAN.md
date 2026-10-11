# Voidlink — ConnecFriend
## Build plan and assignment map

### North star
Build **ConnecFriend**, the social-networking UI required by the FSWD Assignment 1, with a creative visual identity called **Voidlink**. The black-hole / event-horizon motif is the entrance and transition language, not a replacement for the assigned social-networking features.

### Assignment constraints (source: Assignment 1 FSWD Fall 2026)
- Login page for existing users; **no registration page**.
- Profile with personal information, profile picture, and friends list.
- Home feed showing friends' news, name, profile picture, and time since last login.
- Friends in the feed ordered by most recent login first.
- Friend invitation; block sending if the recipient has the requester on their ignore list.
- Friend rating from 1–3: Stupid, Cool, Trustworthy, represented by icons.
- Share a post with all friends or selected friends.
- Like or dislike a post and show both counts.
- Private messages to friends and other members.
- No server calls; simulate request/response behavior in the browser.
- Must use Bootstrap, Tailwind, or Less. This project uses Bootstrap 5.
- Submission is one ZIP containing HTML/CSS/JS and named with the student's roll number.
- The assignment warns against copying existing social-platform UI. The layout here uses a custom cosmic editorial style rather than cloning a known platform.

### Visual direction
- Palette: near-black, graphite, ash, silver; a restrained warm/cool glow is reserved for the event horizon and interaction feedback.
- Entrance: layered CSS accretion rings, dark event horizon, orbiting particles, star field, and a login panel that emerges from the void.
- Page changes: a brief “horizon sweep” overlay on navigation, then the next page fades in.
- UI: custom icon-led cards, large typography, thin borders, atmospheric gradients, and responsive Bootstrap layout.
- Motion must respect `prefers-reduced-motion`.

### File-by-file implementation
- `index.html`: animated black-hole entrance and demo login.
- `home.html`: feed, latest-login ordering, share composer, like/dislike controls.
- `profile.html`: profile information, friend list, friend-rating controls.
- `connections.html`: member discovery and invitations, including ignore-list prevention.
- `messages.html`: private messaging to friends and other members.
- `css/theme.css`: custom visual system and responsive motion.
- `js/data.js`: demo data and browser-local state helpers.
- `js/ui.js`: shared navigation, transitions, notices, and small UI utilities.
- `js/login.js`: demo login validation.
- `js/home.js`: feed rendering, share audience, reactions.
- `js/profile.js`: profile rendering and friend ratings.
- `js/connections.js`: member invitations and ignore-list guard.
- `js/messages.js`: local-only messaging demo.
- `README.md`: beginner-friendly overview, full tree, file responsibilities, run steps, and test checklist.

### Data / no-backend strategy
Everything is a **front-end simulation**. Demo state is saved in `localStorage` where useful. There are no fetch/API/server calls. Seed data provides a realistic first run; reset browser local storage to return to the initial demo state.

### Quality gate before submission
1. Login rejects empty fields and accepts demo credentials (shown on login screen).
2. Feed shows friend name, avatar, update, and time since last login; latest login is first.
3. Share-to-all and share-to-selected audience work in the local demo.
4. Like/dislike counts update and the user can switch reaction.
5. Invitation action refuses when a target ignores the current user.
6. Rating options are exactly 1–3 and use the assigned labels.
7. Messaging can select any listed member, not only friends.
8. Navigation transitions work; reduced-motion setting is respected.
9. Test narrow/mobile width, keyboard navigation, empty form states, and browser console.
10. Before submitting, rename the ZIP to the student's actual roll number. Do not submit with the placeholder filename.

### Creative naming
**Recommended display name:** `Voidlink — ConnecFriend`
It keeps the assignment's required service name visible while giving the interface a distinctive black-hole identity.
