const mongoose = require('mongoose');

const BedSchema = new mongoose.Schema({
  bedID: { type: String, required: true, unique: true },
  ward: { type: String, required: true },
  type: { type: String, required: true }, // Example: ICU, General, Private
  status: { type: String, required: true }, // Example: Available, Occupied, Under Maintenance
});

module.exports = mongoose.model('Bed', BedSchema);
