// controllers/patientController.js
const Patient = require('../models/Patient');

const addPatient = async (req, res) => {
  try {
    // Ensure that 'assignedDoctor' is a string and not an ObjectId
    const { assignedDoctor } = req.body;
    
    // If 'assignedDoctor' is a string ID, save the new patient with the custom ID
    const newPatient = new Patient({
      ...req.body,
      assignedDoctor: assignedDoctor.toString(), // Ensure it's treated as a string
    });

    await newPatient.save();
    res.status(201).send(newPatient);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    // Search using custom patientID instead of the default _id
    const patient = await Patient.findOne({ patientID: req.params.id });
    
    if (!patient) {
      return res.status(404).send({ message: 'Patient not found' });
    }
    
    res.status(200).send(patient);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).send(patients);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


const updatePatient = async (req, res) => {
  try {
    // Update using custom patientID instead of _id
    const patient = await Patient.findOneAndUpdate(
      { patientID: req.params.id }, // Search by patientID
      req.body,                      // Update with new data
      { new: true }                  // Return the updated document
    );

    if (!patient) {
      return res.status(404).send({ message: 'Patient not found' });
    }

    res.status(200).send(patient);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


const deletePatient = async (req, res) => {
  try {
    // Delete using custom patientID instead of _id
    const patient = await Patient.findOneAndDelete({ patientID: req.params.id });

    if (!patient) {
      return res.status(404).send({ message: 'Patient not found' });
    }

    res.status(200).send({ message: 'Patient deleted' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};



module.exports = {
  addPatient,
  getAllPatients,
  getPatientById,
  deletePatient,
  updatePatient,
};