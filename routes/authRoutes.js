const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register Hospital
router.post('/registerHospital', async (req, res) => {
  try {
    const { username, password, details } = req.body;
    const user = new User({ username, password, role: 'Hospital', details });
    await user.save();
    res.status(201).json({ message: 'Hospital registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering hospital', error: err.message });
  }
});

// Register Patient
router.post('/registerPatient', async (req, res) => {
  try {
    const { username, password, details } = req.body;
    const user = new User({ username, password, role: 'Patient', details });
    await user.save();
    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering patient', error: err.message });
  }
});

// Admin Preconfigured Registration (optional)
router.post('/registerAdmin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password, role: 'Admin' });
    await user.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering admin', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

module.exports = router;
