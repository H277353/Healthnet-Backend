// models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  contactInfo: { type: String, required: true },
  hospital: { type: String, required: true }  // Changed from ObjectId to String (custom hospitalID)
});

module.exports = mongoose.model('Doctor', doctorSchema);
