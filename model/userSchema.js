const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    select: false
  }
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT
UserSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1h' }
  );
};

module.exports = model('User', UserSchema);
