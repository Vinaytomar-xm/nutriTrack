const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, required: true, unique: true, trim: true,
      minlength: 3, maxlength: 30,
      match: [/^[a-zA-Z0-9_]+$/, 'Username: letters, numbers, underscores only'],
    },
    email: {
      type: String, required: true, unique: true,
      trim: true, lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Enter a valid email'],
    },
    password: {
      type: String, required: true, minlength: 6, select: false,
    },
    settings: {
      calGoal: { type: Number, default: 2000, min: 500, max: 6000 },
      proGoal: { type: Number, default: 100,  min: 10,  max: 500  },
    },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with stored hash
userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('User', userSchema);
