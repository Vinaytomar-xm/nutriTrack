require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const rateLimit = require('express-rate-limit');
const path      = require('path');
const connectDB = require('./config/db');

const app = express();
connectDB();

// ── Middleware ──────────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ── Rate Limiting ───────────────────────────────────────
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20,  message: { success: false, message: 'Too many requests — try again later' } });
const apiLimiter  = rateLimit({ windowMs:  1 * 60 * 1000, max: 120, message: { success: false, message: 'Rate limit exceeded' } });

// ── API Routes ──────────────────────────────────────────
app.use('/api/auth',    authLimiter, require('./routes/auth'));
app.use('/api/entries', apiLimiter,  require('./routes/entries'));

// ── Health Check ────────────────────────────────────────
app.get('/api/health', (_, res) =>
  res.json({ success: true, message: '🥗 NutriTrack API is running', env: process.env.NODE_ENV, ts: new Date() })
);

// ── Serve React build in production ────────────────────
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (_, res) =>
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  );
}

// ── 404 ─────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// ── Global Error Handler ────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
  });
});

// ── Start ───────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀  Server  → http://localhost:${PORT}`);
  console.log(`   Mode    → ${process.env.NODE_ENV || 'development'}`);
  console.log(`   DB      → ${process.env.MONGO_URI}\n`);
});
