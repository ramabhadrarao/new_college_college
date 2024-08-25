const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Public Routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected Routes
router.post('/change-password', auth, userController.changePassword);
router.post('/logout', auth, userController.logout);

// Role-based Dashboard
router.get('/admin-dashboard', auth, role(['admin']), (req, res) => {
  res.send('Admin Dashboard');
});

router.get('/faculty-dashboard', auth, role(['faculty']), (req, res) => {
  res.send('Faculty Dashboard');
});

router.get('/student-dashboard', auth, role(['student']), (req, res) => {
  res.send('Student Dashboard');
});

module.exports = router;
