const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Application = require('../models/Application');


router.get('/users', async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch users" });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Application.destroy({ where: { userId: id } });
    const userToDelete = await User.findByPk(id);
    if (!userToDelete) {
      return res.status(404).json({ error: "User not found" });
    }
    await userToDelete.destroy();
    console.log(`✅ User with ID ${id} deleted.`);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Server error during deletion" });
  }
});


router.post('/users/create', async (req, res) => {
  try { 
    const { name, email, password, role } = req.body; 
    const newUser = await User.create({ name, email, password, role }); 
    await newUser.save();
    res.status(201).json(newUser); 
  } catch (err) { 
    res.status(500).json({ error: "Could not create user" }); 
  }
});
module.exports = router;