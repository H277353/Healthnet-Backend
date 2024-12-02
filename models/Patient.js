const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientID: { type: String, required: true, unique: true },  // Custom string ID
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contactInfo: { type: String, required: true },
  assignedDoctor: { type: String, required: true },  // Custom string ID for doctor
  status: { type: String, default: 'Pending' }  // e.g., Pending, Under Treatment, Discharged
});

module.exports = mongoose.model('Patient', patientSchema);
