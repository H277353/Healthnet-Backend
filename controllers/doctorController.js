// controllers/doctorController.js
const Doctor = require('../models/Doctor');


const addDoctor = async (req, res) => {
  try {
    // Ensure you're using a custom doctorID if necessary
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).send(newDoctor);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ doctorID: req.params.id }); // Query using custom doctorID
    if (!doctor) {
      return res.status(404).send({ message: 'Doctor not found' });
    }
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { doctorID: req.params.id }, // Use doctorID instead of _id
      req.body,
      { new: true }
    );

    if (!doctor) {
      return res.status(404).send({ message: 'Doctor not found' });
    }
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndDelete({ doctorID: req.params.id }); // Use doctorID instead of _id

    if (!doctor) {
      return res.status(404).send({ message: 'Doctor not found' });
    }
    res.status(200).send({ message: 'Doctor deleted' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};



// Fetch all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Find all doctors in the database
    res.status(200).json(doctors); // Return the doctors as a JSON response
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctors', error: err.message });
  }
};




module.exports = {
  addDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
};