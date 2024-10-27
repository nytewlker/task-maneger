const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


// Generate JWT token
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = new User({ name, email, password, role });

        // Save user to the database
        await user.save();

        // Respond with the newly created user and token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error(error); // Log server errors for debugging
        res.status(500).json({ message: 'Server error', error });
    }
};

// @desc    Authenticate user and get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Respond with user data and token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
};

// @desc    Get logged-in user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateUserProfile = async (req, res) => {
    const { name, email, password, newpassword } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Update user information
        user.name = name || user.name;
        user.email = email || user.email;

        if (newpassword) {
            user.password = newpassword; // Update password only if newpassword is provided
        }

        // Save updated user
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// @desc    Delete user account
// @route   DELETE /api/user/delete
// @access  Private
exports.deleteUserAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user account
        await User.findByIdAndDelete(req.user.id); // This deletes the user directly
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Delete Account Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



// @desc    Get all managers
// @route   GET /api/users/managers
// @access  Private (only Admin or Manager)
exports.getManagers = async (req, res) => {
    try {
      const managers = await User.find({ role: "Manager" }).select("name email");
      res.json(managers);
    } catch (error) {
      res.status(500).json({ message: "Server error while fetching managers", error });
    }
  };



 // Ensure you have nodemailer installed

// @desc    Send verification code for password reset
// @route   POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      user.verificationCode = verificationCode; // Save the verification code
      await user.save();
  
      // Set up email transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      // Send the email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Verification Code',
        text: `Your verification code is: ${verificationCode}`,
      });
  
      res.json({ message: 'Verification code sent to your email' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  










// @desc    Send verification code for password reset
// @route   POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      user.verificationCode = verificationCode; // Save the verification code
      await user.save();
  
      // Set up email transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      // Send the email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Verification Code',
        text: `Your verification code is: ${verificationCode}`,
      });
  
      res.json({ message: 'Verification code sent to your email' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };








  // @desc    Verify the code and allow user to reset password
// @route   POST /api/auth/verify-code
// Updated verifyCode function
exports.verifyCode = async (req, res) => {
    const { email, code, newPassword } = req.body;
  
    try {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user || user.verificationCode !== code) {
        return res.status(400).json({ message: 'Invalid verification code' });
      }
  
      // Hash the new password before saving
      user.password = newPassword; // Ensure to hash this in your model pre-save hook
      user.verificationCode = undefined; // Clear the verification code
      await user.save();
  
      res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  