const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { QueryTypes } = require('sequelize');

router.post('/register', async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    const newUser = await User.create({
      email,
      password,
      name,
      role: role || 'USER'
    });

    console.log(`[AUTH] New user registered: ${email}`);
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name
      }
    });
  } catch (err) {
    console.error("[AUTH] Register error:", err);
    res.status(500).json({ error: "Email already exists or server error" });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("test");
  try {
    const query = `SELECT * FROM Users WHERE email = ? AND password = ?`;
    const results = await User.sequelize.query(query, {
      replacements: [email, password], 
      type: QueryTypes.SELECT 
    });
    // We check if the array contains at least one user
    if (results && results.length > 0) {
      const user = results[0];
      console.log(`[AUTH] Login success for: ${user.email}`);
      res.json({
        message: "Login successful",
        user: { 
          id: user.id, 
          email: user.email, 
          role: user.role, 
          name: user.name || user.email.split('@')[0] 
        }
      });
    } else {
      console.log(`[AUTH] Login failed for: ${email}`);
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("SQL Error:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;