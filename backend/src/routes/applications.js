const express = require('express');
const router = express.Router();
const School = require('../models/School');
const Application = require('../models/Application');
const User = require('../models/User');
const authenticate = require('../middleware/authMiddleware');

/**
 * @openapi
 * /api/application/users/{userId}/{registered}:
 *   get:
 *     summary: Get all schools for a user based on registration status
 *     tags:
 *       - [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user whose applications are to be retrieved
 *       - in: path
 *         name: registered
 *         required: false
 *         description: Whether the user is registered (true/false)
 *     responses:
 *       200:
 *         description: Successful response with all schools for the user
 *       500:
 *         description: Server error while fetching schools for the user
 */
router.get('/application/users/:userId/:registered?', authenticate, async (req, res) => {
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

/**
 * @openapi
 * /api/application/generate/users/{userId}/{schoolId}:
 *   post:
 *     summary: Generate an application for a user to a specific school
 *     tags:
 *       - [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user for whom the application is to be generated
 *       - in: path
 *         name: schoolId
 *         required: true
 *         description: ID of the school to which the application is to be generated
 *     responses:
 *       200:
 *         description: Successful application creation
 *       500:
 *         description: Could not create application due to server error
 */
router.post('/application/generate/:userId/:schoolId',authenticate, async (req, res) => {
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