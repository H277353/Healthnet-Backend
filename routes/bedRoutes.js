const express = require('express');
const {
  getAllBeds,
  addBed,
  updateBed,
  deleteBed,
  getBedById,
} = require('../controllers/bedController');

const router = express.Router();

// Define Routes
router.get('/', getAllBeds); // Fetch all beds
router.post('/add', addBed); // Add a new bed
router.put('/:id', updateBed); // Update bed details
router.delete('/:id', deleteBed); // Remove a bed by ID
router.get('/:id', getBedById); // Fetch a specific bed by ID

module.exports = router;
