const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema(
  {
    patientID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    status: { type: String, required: true, default: 'Waiting' }, // Options: Waiting, In Progress, Completed
  },
  { timestamps: true }
);

module.exports = mongoose.model('Queue', QueueSchema);
