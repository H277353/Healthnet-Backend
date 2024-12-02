const express = require('express');
const { 
  getAllInventoryItems, 
  addMedicine, 
  removeMedicine, 
  getInventoryItemById, 
  updateMedicine 
} = require('../controllers/inventoryController');

const router = express.Router();

// Define Routes
router.get('/', getAllInventoryItems); // Fetch all inventory items
router.post('/add', addMedicine); // Add a new medicine
router.delete('/remove/:id', removeMedicine); // Remove a medicine by ID
router.get('/:id', getInventoryItemById); // Fetch a specific inventory item by ID
router.put('/:id', updateMedicine); // Update medicine details by ID

module.exports = router;
 