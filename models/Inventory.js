const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  medicineID: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
});

const InventorySchema = new mongoose.Schema({
  inventoryID: { type: String, required: true },
  medicines: [MedicineSchema],
});

module.exports = mongoose.model('Inventory', InventorySchema);
