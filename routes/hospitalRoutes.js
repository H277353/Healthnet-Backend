const express = require('express');
const { 
  getAllHospitals, 
  createHospital, 
  getHospitalById, 
  updateHospital, 
  deleteHospital 
} = require('../controllers/hospitalController');

const router = express.Router();

// Define Routes
router.get('/', getAllHospitals); // Fetch all hospitals
router.post('/', createHospital); // Create a new hospital
router.get('/:id', getHospitalById); // Fetch a specific hospital by ID
router.put('/:id', updateHospital); // Update hospital details by ID
router.delete('/:id', deleteHospital); // Delete a hospital by ID

module.exports = router;
