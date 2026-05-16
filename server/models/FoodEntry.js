const mongoose = require('mongoose');

const foodEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', required: true, index: true,
    },
    date: {
      type: String, required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'],
      index: true,
    },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    displayAmount: { type: String, required: true, trim: true },
    calories: { type: Number, required: true, min: 0 },
    protein: { type: Number, required: true, min: 0 },
    isDrink: { type: Boolean, default: false },
    loggedAt: {
      type: String,
      default: () => new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', hour12: true,
      }),
    },
  },
  { timestamps: true }
);

// Fast per-user-per-day lookups
foodEntrySchema.index({ user: 1, date: 1 });

module.exports = mongoose.model('FoodEntry', foodEntrySchema);
