const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and Password are required" });
    }
    
    const newUser = new User({ username, password });
    await newUser.save();
    
    res.status(201).json({ status: 'success', message: 'User created successfully' });
  } catch (err) {
    console.error("❌ Register Error:", err.message); // This prints to your VS Code Terminal
    res.status(500).json({ error: err.message }); // This sends the real error to Postman
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    
    if (user) {
      res.json({ status: 'success', user });
    } else {
      res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;