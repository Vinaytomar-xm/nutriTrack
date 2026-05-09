const express   = require('express');
const router    = express.Router();
const jwt       = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User      = require('../models/User');
const { protect } = require('../middleware/auth');

const makeToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

const sendToken = (user, code, res) =>
  res.status(code).json({
    success: true,
    token: makeToken(user._id),
    user: { id: user._id, username: user.username, email: user.email, settings: user.settings, createdAt: user.createdAt },
  });

// ─── POST /api/auth/register ─────────────────────────────
router.post('/register',
  [
    body('username').trim().isLength({ min: 3, max: 30 }).withMessage('Username must be 3–30 chars')
      .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username: letters, numbers, underscores only'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });

    const { username, email, password } = req.body;
    try {
      const exists = await User.findOne({ $or: [{ username }, { email }] });
      if (exists) {
        const field = exists.username === username ? 'Username' : 'Email';
        return res.status(409).json({ success: false, message: `${field} already taken` });
      }
      const user = await User.create({ username, email, password });
      sendToken(user, 201, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Registration failed' });
    }
  }
);

// ─── POST /api/auth/login ─────────────────────────────────
router.post('/login',
  [
    body('login').trim().notEmpty().withMessage('Username or email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });

    const { login, password } = req.body;
    try {
      const user = await User.findOne({ $or: [{ username: login }, { email: login }] }).select('+password');
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      sendToken(user, 200, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Login failed' });
    }
  }
);

// ─── GET /api/auth/me ─────────────────────────────────────
router.get('/me', protect, (req, res) =>
  res.json({
    success: true,
    user: { id: req.user._id, username: req.user.username, email: req.user.email, settings: req.user.settings, createdAt: req.user.createdAt },
  })
);

// ─── PUT /api/auth/settings ───────────────────────────────
router.put('/settings', protect,
  [
    body('calGoal').isInt({ min: 500, max: 6000 }).withMessage('Calorie goal: 500–6000'),
    body('proGoal').isInt({ min: 10,  max: 500  }).withMessage('Protein goal: 10–500 g'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });

    const { calGoal, proGoal } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { 'settings.calGoal': calGoal, 'settings.proGoal': proGoal },
        { new: true, runValidators: true }
      );
      res.json({ success: true, settings: user.settings });
    } catch {
      res.status(500).json({ success: false, message: 'Could not save settings' });
    }
  }
);

module.exports = router;
