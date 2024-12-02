const express = require('express');
const {
  addPatient,
  getPatientById,
  getAllPatients,
  updatePatient,
  deletePatient,
} = require('../controllers/patientController');

const router = express.Router();

// Define Routes
router.post('/add', addPatient); // Add a new patient
router.get('/:id', getPatientById); // Fetch patient by ID
router.get('/', getAllPatients); // Fetch all patients
router.put('/:id', updatePatient); // Update patient details
router.delete('/:id', deletePatient); // Remove a patient by ID

module.exports = router;
