const { user } = require('../models/user.model');
const { checkAdmin } = require('../utils/user.util');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

class UserService {
  static updateUser = async (userId, payload) => {
    const { name, status } = payload;
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      {
        user_name: name,
        user_status: status,
      },
      { new: true }
    );

    if (!updatedUser) throw new Error('Cannot update this user!');
    return {
      updatedUser,
    };
  };

  static changeRole = async (userId, role) => {
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { user_role: role },
      { new: true }
    );

    if (!updatedUser) throw new Error('Cannot change role!');
    return {
      updatedUser,
    };
  };

  static deleteUser = async (userId) => {
    const isAdmin = await checkAdmin(userId);
    if (isAdmin) throw new Error('Cannot delete admin!');

    const deletedUser = await user.findByIdAndDelete(userId);
    if (!deletedUser) throw new Error('Cannot delete this user!');
    return {
      deletedUser,
    };
  };

  static sendEmailConfirmation = async (email) => {
    const foundUser = await user.findOne({ user_email: email });
    if (!foundUser) throw new Error('User not found!');

    const emailConfirmationKey = process.env.EMAIL_CONFIRMATION_KEY;
    const confirmationToken = jwt.sign(
      { userId: foundUser._id, email },
      emailConfirmationKey,
      {
        expiresIn: '15 minutes',
      }
    );

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailInfo = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Account Confirmation',
      text: `Click the following link to confirm your email: http://localhost:${process.env.DEV_APP_PORT}/api/user/confirm/${confirmationToken}`,
    };

    const result = await transporter.sendMail(mailInfo);
    if (!result) throw new Error('Failed to send email confirmation!');
    return {
      result,
      confirmationToken,
    };
  };

  static confirmEmail = async (token) => {
    const emailConfirmationKey = process.env.EMAIL_CONFIRMATION_KEY;
    const decodedData = jwt.verify(token, emailConfirmationKey);

    const foundUser = await user.findById(decodedData.userId);
    if (!foundUser) throw new Error('User not found!');

    if (foundUser.user_verified) throw new Error('User has already confirmed!');

    foundUser.user_verified = true;

    const confirmedUser = await foundUser.save();
    if (!confirmedUser)
      throw new Error('Cannot confirm your account by email!');
    return {
      confirmedUser,
    };
  };
}

module.exports = UserService;
