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
router.get('/inventory', getAllInventoryItems); // Fetch all inventory items
router.post('/inventory/add', addMedicine); // Add a new medicine
router.delete('/inventory/remove/:id', removeMedicine); // Remove a medicine by ID
router.get('/inventory/:id', getInventoryItemById); // Fetch a specific inventory item by ID
router.put('/inventory/:id', updateMedicine); // Update medicine details by ID

module.exports = router;
