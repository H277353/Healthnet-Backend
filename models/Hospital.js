const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  hospitalID: { type: String, required: true, unique: true },
  hospitalName: { type: String, required: true },
  hospitalLocation: { type: String, required: true },
  hospitalContactInfo: { type: String, required: true },
});

module.exports = mongoose.model('Hospital', hospitalSchema);
