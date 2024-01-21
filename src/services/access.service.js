const { user } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/auth.util');

class AccessService {
  static signUp = async ({ name, email, password }) => {
    const foundUser = await user.findOne({ user_email: email });
    if (foundUser) {
      throw new Error('User already registered!');
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      user_name: name,
      user_email: email,
      user_password: passwordHash,
    });

    if (newUser) {
      return {
        user: newUser,
      };
    }
  };

  static logIn = async ({ email, password }) => {
    const foundUser = await user.findOne({ user_email: email });
    if (!foundUser) throw new Error('User not exists!');

    const match = await bcrypt.compare(password, foundUser.user_password);
    if (!match) throw new Error('Authentication error!');

    return {
      user: foundUser,
      token: generateToken({ userId: foundUser._id, email }),
    };
  };
}

module.exports = AccessService;
