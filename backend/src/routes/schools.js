const express = require('express');
const router = express.Router();
const School = require('../models/School');
const Application = require('../models/Application');
const authorizeAdmin = require('../middleware/roleMiddleware'); 
/**
 * @openapi
 * /api/schools:
 *   get:
 *     summary: Get all schools
 *     tags:
 *       - [Schools]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with all schools
 *       500:
 *         description: Server error while fetching schools
 */
router.get('/schools',authorizeAdmin, async (req, res) => {
  try {
    const allSchools = await School.findAll();
    res.json(allSchools);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch schools" });
  }
});

/**
 * @openapi
 * /api/schools/{id}:
 *   delete:
 *     summary: delete a school by ID
 *     tags:
 *       - [Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the school to delete
 *     responses:
 *       200:
 *         description: School deleted successfully
 *       500:
 *         description: Could not delete school
 */
router.delete('/schools/:id',authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await Application.destroy({ where: { schoolId: id } });
    const schoolToDelete = await School.findByPk(id);
    if (!schoolToDelete) {
      return res.status(404).json({ error: "School not found" });
    }
    await schoolToDelete.destroy();
    console.log(`✅ School with ID ${id} deleted.`);
    res.status(200).json({ message: "School deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Server error during deletion" });
  }
});

/**
 * @openapi
 * /api/schools/create:
 *   post:
 *     summary: Create a new school
 *     tags:
 *       - [Schools]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *               maxPlace:
 *                 type: integer
 *     responses:
 *       201:
 *         description: School created successfully
 *       500:
 *         description: Could not create school
 */  
router.post('/schools/create',authorizeAdmin, async (req, res) => {
  try {
    const { name, status, maxPlace } = req.body;
    const newSchool = await School.create({ name, status, maxPlace });
    res.status(201).json(newSchool);
  } catch (err) {
    res.status(500).json({ error: "Could not create school" });
  }
});

module.exports = router;