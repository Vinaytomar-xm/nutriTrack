# 🥗 NutriTrack — MERN Stack

A full-stack **Calories & Protein Tracker** built with MongoDB, Express, React, and Node.js.  
Real JWT authentication, all data persisted in MongoDB, fully mobile-responsive UI.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔐 JWT Auth | Register/login with bcrypt-hashed passwords (12 salt rounds) |
| 🗄 MongoDB | All entries & user data persisted in real database |
| 🔍 Food Search | Autocomplete across 100+ Indian & common foods |
| 🧠 Smart Units | Drinks → ml/L · Food → g/kg (auto-switches on selection) |
| 📊 Dashboard | Live calories + protein totals, progress bars vs daily goals |
| 📅 Date Nav | Browse and log any past day with ← → arrows |
| 🗂 History | Expandable per-day logs fetched from MongoDB |
| 📈 Weekly Chart | 7-day calorie bar chart in Settings |
| ⚙️ Goals | Custom daily calorie & protein targets per user |
| 📤 CSV Export | Download full history as spreadsheet |
| 📱 Mobile-First | Bottom nav, safe-area insets, 44px touch targets, no iOS zoom |
| 🔒 Rate Limiting | Auth: 20 req/15 min · API: 120 req/min |

---

## 🏗 Project Structure

```
nutritrack-mern/
│
├── package.json                 ← Root: runs both with concurrently
├── .gitignore
│
├── server/                      ← Node.js + Express backend
│   ├── server.js                ← App entry, middleware, routes, static serving
│   ├── package.json
│   ├── .env.example             ← Copy → .env and fill in values
│   ├── config/
│   │   └── db.js                ← Mongoose connection
│   ├── middleware/
│   │   └── auth.js              ← JWT protect middleware
│   ├── models/
│   │   ├── User.js              ← User schema + bcrypt pre-save hook
│   │   └── FoodEntry.js         ← Food entry schema + compound index
│   └── routes/
│       ├── auth.js              ← /api/auth/* (register, login, me, settings)
│       └── entries.js           ← /api/entries/* (CRUD, history, stats, clear)
│
└── client/                      ← React 18 frontend
    ├── package.json             ← proxy → localhost:5000
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js             ← ReactDOM.createRoot + AuthProvider
        ├── index.css            ← Global styles + full responsive breakpoints
        ├── App.jsx              ← Layout, sidebar/bottom-nav, tab routing, auth gate
        ├── context/
        │   └── AuthContext.jsx  ← Global auth state, JWT storage, reducer
        ├── hooks/
        │   └── useEntries.js    ← useEntries, useHistory, useStats custom hooks
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── TodayLog.jsx     ← Add food, log list, date nav, autocomplete
        │   ├── History.jsx      ← Expandable history from DB + CSV export
        │   └── Settings.jsx     ← Goals, weekly chart, account info
        └── utils/
            ├── api.js           ← Axios instance with JWT interceptor + auto-logout
            └── foodDb.js        ← 100+ food items with cal/protein per 100g or 100ml
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** v18+ → [nodejs.org](https://nodejs.org)
- **MongoDB** — choose one:
  - **Local:** [Install MongoDB Community](https://www.mongodb.com/try/download/community)
  - **Cloud:** [MongoDB Atlas](https://www.mongodb.com/atlas) — free M0 tier

---

### Step 1 — Install all dependencies

```bash
cd nutritrack-mern

# Install root + server + client in one command
npm run install:all
```

Or manually:
```bash
npm install                  # root (concurrently)
cd server && npm install     # Express, Mongoose, JWT, bcrypt, etc.
cd ../client && npm install  # React, Axios
```

---

### Step 2 — Configure environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/nutritrack
JWT_SECRET=replace_with_a_long_random_string_at_least_32_characters
JWT_EXPIRE=7d
NODE_ENV=development
```

**Using MongoDB Atlas?** Your URI looks like:
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/nutritrack?retryWrites=true&w=majority
```

---

### Step 3 — Start development servers

```bash
# From the root — starts Express (port 5000) AND React (port 3000) together
npm run dev
```

Open **http://localhost:3000** in your browser.

> The React dev server proxies all `/api/*` requests to `:5000` automatically  
> (configured via `"proxy": "http://localhost:5000"` in `client/package.json`)

---

## 🔌 REST API Reference

All protected routes require the header:
```
Authorization: Bearer <jwt_token>
```

### Auth  `/api/auth`

| Method | Endpoint | Body | Auth | Description |
|---|---|---|---|---|
| POST | `/register` | `{username, email, password}` | No | Create account |
| POST | `/login` | `{login, password}` | No | Login by username OR email |
| GET | `/me` | — | Yes | Get logged-in user |
| PUT | `/settings` | `{calGoal, proGoal}` | Yes | Update daily goals |

### Entries  `/api/entries`  (all protected)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/?date=YYYY-MM-DD` | Entries for one date (today if omitted) |
| GET | `/history` | All dates grouped — last 90 days |
| GET | `/stats` | Last 7 days daily totals |
| POST | `/` | Add a food entry |
| DELETE | `/:id` | Delete one entry |
| DELETE | `/clear/:date` | Delete all entries for a date |

#### POST `/api/entries` body example:
```json
{
  "name": "Chicken Breast (boiled)",
  "displayAmount": "150 g",
  "calories": 247.5,
  "protein": 46.5,
  "date": "2025-01-15",
  "isDrink": false,
  "loggedAt": "01:30 PM"
}
```

#### Success response format:
```json
{ "success": true, "entry": { "_id": "...", "name": "...", ... } }
```

#### Error response format:
```json
{ "success": false, "message": "Reason for error" }
```

---

## 🗄 MongoDB Schemas

### User
```
username   String  unique · 3–30 chars · /^[a-zA-Z0-9_]+$/
email      String  unique · valid email · lowercased
password   String  bcrypt hash · select:false (never returned in queries)
settings   Object  { calGoal: Number (default 2000), proGoal: Number (default 100) }
createdAt  Date    auto
updatedAt  Date    auto
```

### FoodEntry
```
user          ObjectId  ref:User · indexed
date          String    YYYY-MM-DD · indexed
name          String    max 100 chars
displayAmount String    e.g. "150 g" or "300 ml"
calories      Number    ≥ 0 · rounded to 1 decimal
protein       Number    ≥ 0 · rounded to 1 decimal
isDrink       Boolean   default false
loggedAt      String    display time e.g. "01:30 PM"
createdAt     Date      auto (used for sorting within a day)

Compound index: { user: 1, date: 1 }  → fast per-user-per-day queries
```

---

## 🔒 Security

| Concern | Solution |
|---|---|
| Passwords | bcrypt · 12 salt rounds |
| Auth tokens | JWT · 7-day expiry · HS256 |
| Input validation | express-validator on all write routes |
| Rate limiting | express-rate-limit (auth: 20/15min, api: 120/min) |
| CORS | Restricted to localhost:3000 in dev / CLIENT_URL in prod |
| Query injection | Mongoose parameterised queries |
| Password exposure | `select: false` on password field |

---

## 🚀 Production Deployment

### 1 — Build React
```bash
cd nutritrack-mern
npm run build
# Outputs to client/build/
```

### 2 — Serve from Express (already wired in server.js)
`server.js` already has this for `NODE_ENV=production`:
```js
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (_, res) =>
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
);
```

### 3 — Production environment
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=<very-long-random-secret>
CLIENT_URL=https://your-domain.com
```

### Deployment platforms

**Railway / Render / Fly.io** (easiest):
```bash
# Push repo → set env vars in dashboard → deploy
# Set build command: npm run build
# Set start command: npm start
```

**VPS with PM2:**
```bash
npm install -g pm2
npm run build
pm2 start server/server.js --name nutritrack
pm2 save
pm2 startup
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/
RUN npm run install:all
COPY . .
RUN npm run build
EXPOSE 5000
ENV NODE_ENV=production
CMD ["npm", "start"]
```

---

## 🔧 Customisation

### Add foods to the database
Edit `client/src/utils/foodDb.js`:
```js
{ name: 'Paneer Tikka', isDrink: false, cal100: 230, pro100: 14.0 },
// isDrink:true  → unit selector shows ml / L
// isDrink:false → unit selector shows g / kg
// cal100 = calories per 100g (or per 100ml for drinks)
// pro100 = protein grams per 100g (or per 100ml for drinks)
```

### Change the accent color
In `client/src/index.css`, edit `:root`:
```css
:root {
  --grn:  #4ade80;   /* glow / highlights  */
  --gdim: #22c55e;   /* button primary     */
  --gdk:  #166534;   /* dark shade         */
}
```

### Change default daily goals
In `server/models/User.js`:
```js
settings: {
  calGoal: { type: Number, default: 2000 },  // ← change here
  proGoal: { type: Number, default: 100  },  // ← change here
},
```

---

## 📱 Mobile Details

- Bottom navigation replaces sidebar on screens ≤ 768px
- `env(safe-area-inset-bottom)` — clears iPhone home indicator bar
- Minimum touch target: **44px** (Apple HIG / WCAG 2.5.5)
- `font-size: 1rem` on all inputs — prevents iOS Safari zoom on focus
- `backdrop-filter: blur(16px)` on bottom nav — native app feel
- Tablet breakpoint at 1024px — narrower sidebar, 2×2 stat grid
- Landscape mobile — 4-column stat grid for short viewports

---

## 📦 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend | React | 18 |
| HTTP client | Axios | 1.7 |
| Backend | Node.js + Express | 18 / 4.19 |
| Database | MongoDB + Mongoose | 7 / 8.4 |
| Auth | jsonwebtoken + bcryptjs | 9 / 2.4 |
| Validation | express-validator | 7.1 |
| Security | express-rate-limit, cors | 7.3 / 2.8 |
| Dev tools | nodemon, concurrently | 3.1 / 8.2 |
| Fonts | Outfit + JetBrains Mono | Google Fonts CDN |

---

## 🧰 Available Scripts

| Command | Description |
|---|---|
| `npm run install:all` | Install all dependencies (root + server + client) |
| `npm run dev` | Start both Express + React in development mode |
| `npm run server` | Start Express server only (nodemon, port 5000) |
| `npm run client` | Start React dev server only (port 3000) |
| `npm run build` | Build React for production (`client/build/`) |
| `npm start` | Run Express in production (serves built React too) |

---

## 🧪 API Testing (Postman / Insomnia)

**1. Register:**
```
POST http://localhost:5000/api/auth/register
Body: { "username": "alice", "email": "alice@test.com", "password": "secret123" }
```

**2. Login → copy token from response:**
```
POST http://localhost:5000/api/auth/login
Body: { "login": "alice", "password": "secret123" }
```

**3. Add entry (use token from step 2):**
```
POST http://localhost:5000/api/entries
Header: Authorization: Bearer <token>
Body: { "name":"Oats (dry)","displayAmount":"50 g","calories":194,"protein":8.5,"date":"2025-01-15","isDrink":false,"loggedAt":"08:00 AM" }
```

**4. Get today's entries:**
```
GET http://localhost:5000/api/entries?date=2025-01-15
Header: Authorization: Bearer <token>
```

**5. Get history:**
```
GET http://localhost:5000/api/entries/history
Header: Authorization: Bearer <token>
```

---

## 📋 Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ (iOS & macOS) | ✅ Full |
| Samsung Internet 14+ | ✅ Full |
| IE 11 | ❌ Not supported |

---

## 📄 License

MIT — free to use, modify, and deploy.
