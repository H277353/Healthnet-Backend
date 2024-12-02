const express = require('express');
const {
  addDoctor,
  getDoctorById,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');

const router = express.Router();

// Define Routes
router.post('/add', addDoctor); // Add a new doctor
router.get('/:id', getDoctorById); // Fetch doctor by ID
router.get('/', getAllDoctors); // Fetch all doctors
router.put('/:id', updateDoctor); // Update doctor details
router.delete('/:id', deleteDoctor); // Remove a doctor by ID

module.exports = router;
