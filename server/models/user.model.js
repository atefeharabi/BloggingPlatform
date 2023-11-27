import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
});

// Virtual field for plain text password
userSchema.virtual('password')
  .set(function (password) {
    // Save the plain text password temporarily to use it during validation
    this._password = password;
    // Hash the password and set it to the hashed_password field
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// Methods to handle password encryption
userSchema.methods = {
  // Encrypt the password using bcrypt
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return bcrypt.hashSync(password, 10);
    } catch (err) {
      return '';
    }
  },
  // Authenticate the user by comparing the hashed password
  authenticate: function (plainText) {
    return bcrypt.compareSync(plainText, this.hashed_password);
  },
};

// Middleware to hash the password before saving to the database
userSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    this.hashed_password = this.encryptPassword(this.password);
  }
  next();
});


export default mongoose.model('User', userSchema);