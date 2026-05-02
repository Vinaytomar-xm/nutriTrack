# 🥗 NutriTrack

**A zero-dependency, single-file calorie & protein tracker that runs entirely in your browser.**

No server. No installation. No internet required after the first load. Just open `index.html` and start logging.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔐 Multi-user login | Register/login with username + password. Each user's data is fully isolated. |
| 🔍 Food search | Instant autocomplete across 100+ Indian & common foods |
| 🧠 Smart units | **Drinks** → ml / L automatically · **Food** → g / kg automatically |
| 📊 Daily dashboard | Live calorie + protein totals, progress bars, per-meal average |
| 📅 Date navigation | Browse & edit any past day using the ← → arrows |
| 🗂 History tab | Full expandable log of every past day |
| ⚙️ Custom goals | Set your own daily calorie and protein targets |
| 📤 CSV export | Download your entire history as a spreadsheet |
| 📱 Mobile-first | Responsive bottom nav, safe-area insets, 44px touch targets, no iOS zoom |

---

## 🚀 Getting Started

### Option A — Open directly (simplest)
```
Double-click  index.html  →  opens in your browser
```
That's it. No build step, no `npm install`, nothing.

### Option B — Serve locally (recommended for development)
```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .

# VS Code
Install "Live Server" extension → click "Go Live"
```
Then visit `http://localhost:8080`

---

## 📁 File Structure

```
nutritrack/
├── index.html   ← The entire app (HTML + CSS + JS, single file)
└── README.md    ← This file
```

Everything lives in one self-contained file. CSS and JavaScript are embedded inline — no external files needed (except the Google Fonts CDN link, which is optional).

---

## 🗄 Data Storage

All data is stored in **`localStorage`** — the browser's built-in key-value store.

| Key pattern | Contents |
|---|---|
| `nt3_u` | All registered usernames → hashed passwords |
| `nt3_sess` | Currently logged-in username |
| `nt3_<user>_<YYYY-MM-DD>` | Food entries array for that user/day |
| `nt3s_<user>` | User's calorie & protein goals |

> **Note:** Data is stored per-browser, per-device. It does not sync across devices. Use the **Export CSV** button in History to back up your data.

---

## 🍎 Food Database

The built-in database includes **100+ items** across these categories:

- **Drinks** — Water, Milk (full/toned/skimmed), Chai, Coffee, Juices, Lassi, Coconut Water, Protein Shake, Soda…
- **Grains** — Roti, Rice (white/brown/basmati), Paratha, Idli, Dosa, Oats, Bread, Naan…
- **Dal & Legumes** — Dal Tadka, Rajma, Chole, Moong, Masoor, Sprouts, Peanuts…
- **Vegetables** — Palak Paneer, Aloo Sabzi, Bhindi, Matar Paneer, Cauliflower, Spinach…
- **Non-Veg** — Chicken Breast, Chicken Curry, Eggs (boiled/omelette), Fish Curry, Mutton, Tuna…
- **Dairy** — Paneer, Curd, Greek Yogurt, Butter, Ghee, Cheese, Whey Protein…
- **Snacks** — Samosa, Pakora, Pizza, Burger, Chips, Dhokla, Vada Pav…
- **Fruits** — Banana, Apple, Mango, Orange, Watermelon, Guava, Strawberry…
- **Sweets** — Gulab Jamun, Kheer, Halwa, Ice Cream, Chocolate, Rasgulla…

### Adding your own foods
Open `index.html` in a text editor and find the `const DB = [` array. Add a new entry:

```js
{ name:"Your Food Name", isDrink:false, cal100:250, pro100:12.0 },
// isDrink:true  → unit selector shows ml / L
// isDrink:false → unit selector shows g / kg
// cal100 = calories per 100 g (or 100 ml for drinks)
// pro100 = protein grams per 100 g (or 100 ml for drinks)
```

---

## 📱 Mobile Usage

NutriTrack is fully optimised for phones:

- **Bottom navigation bar** replaces the sidebar on screens ≤ 768px
- **Safe-area insets** applied so content clears the iPhone notch and home bar
- **44 px minimum touch targets** on all interactive elements
- **No iOS keyboard zoom** — all inputs use `font-size: 16px`
- **Blur backdrop** on the bottom nav for a native app feel
- Works in **landscape mode** too

To install as a home-screen app (PWA-style):
1. Open `index.html` in Safari (iOS) or Chrome (Android)
2. Tap **Share → Add to Home Screen**

---

## 🔒 Security Notes

- Passwords are stored as **Base64** (`btoa()`), which is obfuscation, not encryption.
- This app is designed for **personal, local use** only.
- Do not expose it over a public network or use real/sensitive passwords.
- If you need multi-device sync or stronger security, a backend + proper hashing (bcrypt) would be needed.

---

## 🛠 Customisation

### Change default goals
In `index.html`, find `getS()`:
```js
function getS(){
  return JSON.parse(localStorage.getItem(`nt3s_${CU}`)) || { calGoal:2000, proGoal:100 };
}
```
Change `2000` (calories) and `100` (protein grams) to your preferred defaults.

### Change the color theme
Edit the CSS variables at the top of `<style>`:
```css
:root {
  --bg:     #0b0f0c;   /* page background */
  --green:  #4ade80;   /* accent color    */
  --gdim:   #22c55e;   /* button color    */
  /* ... */
}
```

---

## 📤 Exporting Data

1. Go to the **History** tab
2. Click **⬇ Export CSV**
3. A `.csv` file downloads — open in Excel, Google Sheets, or Numbers

CSV columns: `Date, Time, Name, Amount, Calories (kcal), Protein (g)`

---

## 🧰 Tech Stack

| Layer | Tech |
|---|---|
| Markup | HTML5 |
| Styles | Vanilla CSS (CSS Grid, Flexbox, CSS variables, media queries) |
| Logic | Vanilla JavaScript (ES6+) |
| Storage | Browser `localStorage` |
| Fonts | Google Fonts — Outfit + JetBrains Mono |
| Dependencies | **None** |

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

## 📝 Changelog

### v3 (current)
- All-English UI
- Smart unit selector: drinks → ml/L, food → g/kg
- Full mobile responsive with bottom nav
- Safe-area insets for iPhone notch/home bar
- iOS zoom fix (16px font on inputs)
- Tablet breakpoint (1024px)
- Landscape mobile support
- 44px minimum touch targets

### v2
- Replaced Hindi text with English
- Added drink/food type tagging in search
- Quantity parser with unit conversion

### v1
- Initial release: login, food log, daily totals, history, CSV export

---

## 📄 License

MIT — free to use, modify, and distribute.