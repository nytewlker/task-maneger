const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserAccount, getManagers, forgotPassword, verifyCode } = require('../controller/authController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.delete('/delete', protect, deleteUserAccount);

router.get("/managers", protect, authorizeRoles("Admin", "Manager"), getManagers);

router.post('/forgot-password', forgotPassword); // Route for sending verification code
router.post('/verify-code', verifyCode); // Route for verifying code and resetting password

module.exports = router;
