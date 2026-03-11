const express = require('express');
const router = express.Router();
const School = require('../models/School');
const Application = require('../models/Application');
const User = require('../models/User');

router.get('/application/users/:userId/:registered?', async (req, res) => {
    try {
        const {userId, registered} = req.params;
        let schools = [];
        const allSchools = await School.findAll();
        for (const school of allSchools) {
            if (school.maxPlace > 0){
                const isSubscribed = await Application.findOne({
                where: { userId: userId, schoolId: school.id }
            });
            if ((registered === "false" && !isSubscribed) || (registered === "true" && isSubscribed)) {
                schools.push(school);
            }
            }
        }
        res.json({schools});
    } catch (err) {
        res.status(500).json({ error: "Could not retrieve applications" });
    }
});


router.post('/application/generate/:userId/:schoolId', async (req, res) => {
  try {
    const { userId, schoolId } = req.params;
    const user = await User.findByPk(userId);
    const school = await School.findByPk(schoolId);
    school.maxPlace -= 1;
    await school.save();
    const newApplication = await Application.create({
      userId: user.id,
      schoolId: school.id, 
        rank: 1});
    res.status(201).json(newApplication);
  } catch (err) {
    res.status(500).json({ error: "Could not create application" });
  }
});

module.exports = router;