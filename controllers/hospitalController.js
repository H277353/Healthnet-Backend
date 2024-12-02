const Hospital = require('../models/Hospital');

// 1. Fetch All Hospitals
const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hospitals', error: err.message });
  }
};

// 2. Create a New Hospital
const createHospital = async (req, res) => {
  try {
    const { hospitalID, hospitalName, hospitalLocation, hospitalContactInfo } = req.body;

    const newHospital = new Hospital({
      hospitalID,
      hospitalName,
      hospitalLocation,
      hospitalContactInfo,
    });

    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital);
  } catch (err) {
    res.status(500).json({ message: 'Error creating hospital', error: err.message });
  }
};

const getHospitalById = async (req, res) => {
  try {
    const { id } = req.params;
    // Query using the custom hospitalID instead of the default _id field
    const hospital = await Hospital.findOne({ hospitalID: id });

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.status(200).json(hospital);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hospital', error: err.message });
  }
};


const updateHospital = async (req, res) => {
  try {
    const { id } = req.params; // Custom hospitalID
    const { hospitalName, hospitalLocation, hospitalContactInfo } = req.body;

    // Use findOneAndUpdate with hospitalID instead of the default _id
    const updatedHospital = await Hospital.findOneAndUpdate(
      { hospitalID: id }, // Query by hospitalID
      { hospitalName, hospitalLocation, hospitalContactInfo },
      { new: true } // Return the updated document
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.status(200).json(updatedHospital);
  } catch (err) {
    res.status(500).json({ message: 'Error updating hospital', error: err.message });
  }
};


// 5. Delete a Hospital
const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params; // Custom hospitalID
    const deletedHospital = await Hospital.findOneAndDelete({ hospitalID: id }); // Use hospitalID for deletion

    if (!deletedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.status(200).json({ message: 'Hospital deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting hospital', error: err.message });
  }
};


module.exports = {
  getAllHospitals,
  createHospital,
  getHospitalById,
  updateHospital,
  deleteHospital,
};
