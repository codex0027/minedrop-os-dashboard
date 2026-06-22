# MineDrop OS — Staff Dashboard

A complete frontend for the **MineDrop Network** staff console — a centralized infrastructure dashboard for managing Discord, Minecraft, moderation, tickets, security, analytics, backups, and bot operations.

> Static demo build · vanilla HTML + Tailwind CDN + Chart.js + lucide. No build step. No backend yet.

---

## Pages

| Page | File | Purpose |
|---|---|---|
| Login | `index.html` | Discord OAuth2 entry (mocked — redirects to dashboard) |
| Discord Analytics | `dashboard.html` | Members, joins/leaves, activity, mod stats, charts |
| Minecraft Analytics | `minecraft.html` | Java + Bedrock status, TPS, RAM/CPU, world stats |
| Moderation | `moderation.html` | Protection toggles, banned words, scam phrases, unicode filters, escalation ladder |
| Link Permissions | `links.html` | Allowed-channels list, link rules, violations log |
| Tickets | `tickets.html` | Open/closed list, search, export, staff workload chart |
| Live Logs | `logs.html` | Real-time stream with filter, search, pause/export |
| Backups | `backups.html` | Create / restore / download / schedule snapshots |
| Bot Controls | `bot-controls.html` | Restart, reload, maintenance mode, direct command terminal |
| Publisher | `publisher.html` | Markdown composer + Discord-style preview + bot send |
| Access Control | `roles.html` | Verified staff role IDs + permission matrix + sign-in audit |
| Public Status | `status.html` | No-login network status page |

---

## Stack

- **HTML** — no framework, no build step, one file per page
- **Tailwind CSS** via CDN — utilities only; most styling lives in `assets/css/theme.css`
- **Chart.js 4** — analytics & uptime charts
- **lucide** — icon set
- **Google Fonts** — `Press Start 2P` (pixel headings) · `Inter` (body) · `JetBrains Mono` (data)

---

## Run locally

```bash
# from the project root
python3 -m http.server 3000
# then open http://localhost:3000
```

That's it. No `npm install`, no bundler.

---

## Project structure

```
.
├── index.html                # Login (entry)
├── dashboard.html            # Discord analytics
├── minecraft.html            # Minecraft analytics
├── moderation.html           # Moderation control panel
├── links.html                # Link permission manager
├── tickets.html              # Ticket dashboard
├── logs.html                 # Live logs viewer
├── backups.html              # Backup system
├── bot-controls.html         # Bot controls + terminal
├── publisher.html            # Bot announcement publisher
├── roles.html                # Role / access control
├── status.html               # Public server status (no auth)
└── assets/
    ├── css/theme.css         # Theme: variables, cards, buttons, tables, toggles, sidebar
    └── js/
        ├── app.js            # Shared sidebar/topbar shell + toast + clock
        └── mock.js           # All mock data + helpers (jitter, randInt, pick)
```

---

## What's mock-only

This is a **frontend-only demo**. Everything that would normally talk to a server is faked client-side:

- Login redirects without verifying a Discord token
- Stats tick on `setInterval` with random walks
- CRUD (banned words, scam phrases, channels, roles, backups) lives in memory and resets on refresh
- "Send via Bot" / "Restart" / "Restore" / "Execute" fire toasts only
- Live logs are seeded from a fixed pool and randomly sampled

---

## Wiring up a real backend (planned)

1. Replace `assets/js/mock.js` with `fetch('/api/...')` calls
2. Add a small Node.js/Express (or similar) server with:
   - Discord OAuth2 with role-gate against the verified role IDs
   - SQLite (current) → PostgreSQL (planned) for moderation tables, tickets, suggestions, etc.
   - WebSocket endpoint for live logs / live stats (replace the polling intervals)
   - Bot RPC for the `/api/bot/*` actions
3. Add session cookies + CSRF
4. Deploy frontend behind `dashboard.minedrop.net` (Cloudflare); API behind `api.minedrop.net`

---

## Theme

Dark Minecraft-inspired palette — grass green accents, lava orange, diamond cyan, redstone red, ender purple. Pixel headings use `Press Start 2P`. Chunky "block-edge" cards echo Minecraft blocks. Subtle dirt-grid background pattern.

All theme tokens are CSS variables in `assets/css/theme.css` — change them in one place to re-skin the entire dashboard.

---

## Security notes

- **Never commit credentials.** The original requirements document contained a live Discord bot token and client secret in plain text — those were flagged and should have been rotated immediately.
- Always use a `.env` file (in `.gitignore`) for any secrets when adding the backend.
- The frontend has no auth — all access control happens server-side once the backend is added.

---

## License

Copyright © MineDrop Network. All rights reserved.
