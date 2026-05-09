const express    = require('express');
const router     = express.Router();
const { body, validationResult } = require('express-validator');
const FoodEntry  = require('../models/FoodEntry');
const { protect } = require('../middleware/auth');

router.use(protect);

// ─── GET /api/entries?date=YYYY-MM-DD ────────────────────
router.get('/', async (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0, 10);
  try {
    const entries = await FoodEntry.find({ user: req.user._id, date }).sort({ createdAt: 1 });
    res.json({ success: true, entries });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to load entries' });
  }
});

// ─── GET /api/entries/history ─────────────────────────────
router.get('/history', async (req, res) => {
  try {
    const history = await FoodEntry.aggregate([
      { $match: { user: req.user._id } },
      { $group: {
          _id:            '$date',
          totalCalories:  { $sum: '$calories' },
          totalProtein:   { $sum: '$protein'  },
          count:          { $sum: 1 },
          entries:        { $push: '$$ROOT' },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 90 },
    ]);
    res.json({ success: true, history });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to load history' });
  }
});

// ─── GET /api/entries/stats (last 7 days) ─────────────────
router.get('/stats', async (req, res) => {
  try {
    const from = new Date();
    from.setDate(from.getDate() - 6);
    const fromStr = from.toISOString().slice(0, 10);

    const stats = await FoodEntry.aggregate([
      { $match: { user: req.user._id, date: { $gte: fromStr } } },
      { $group: {
          _id:      '$date',
          calories: { $sum: '$calories' },
          protein:  { $sum: '$protein'  },
          meals:    { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json({ success: true, stats });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to load stats' });
  }
});

// ─── POST /api/entries ────────────────────────────────────
router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Food name required').isLength({ max: 100 }),
    body('displayAmount').trim().notEmpty().withMessage('Amount required'),
    body('calories').isFloat({ min: 0 }).withMessage('Calories must be ≥ 0'),
    body('protein').isFloat({ min: 0 }).withMessage('Protein must be ≥ 0'),
    body('date').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date must be YYYY-MM-DD'),
    body('isDrink').optional().isBoolean(),
    body('loggedAt').optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });

    const { name, displayAmount, calories, protein, date, isDrink, loggedAt } = req.body;
    try {
      const entry = await FoodEntry.create({
        user: req.user._id, name, displayAmount,
        calories: Math.round(calories * 10) / 10,
        protein:  Math.round(protein  * 10) / 10,
        date, isDrink: !!isDrink, loggedAt,
      });
      res.status(201).json({ success: true, entry });
    } catch {
      res.status(500).json({ success: false, message: 'Could not save entry' });
    }
  }
);

// ─── DELETE /api/entries/clear/:date ─────────────────────
// Must be before /:id so Express matches it first
router.delete('/clear/:date', async (req, res) => {
  const { date } = req.params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ success: false, message: 'Invalid date format' });
  }
  try {
    const r = await FoodEntry.deleteMany({ user: req.user._id, date });
    res.json({ success: true, deleted: r.deletedCount });
  } catch {
    res.status(500).json({ success: false, message: 'Could not clear day' });
  }
});

// ─── DELETE /api/entries/:id ──────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const entry = await FoodEntry.findOne({ _id: req.params.id, user: req.user._id });
    if (!entry) return res.status(404).json({ success: false, message: 'Entry not found' });
    await entry.deleteOne();
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, message: 'Could not delete entry' });
  }
});

module.exports = router;
