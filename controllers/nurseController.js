// controllers/nurseController.js
const Nurse = require('../models/Nurse');

const addNurse = async (req, res) => {
  try {
    const newNurse = new Nurse(req.body);
    await newNurse.save();
    res.status(201).send(newNurse);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getNurseById = async (req, res) => {
  try {
    // Query by custom nurseID instead of _id
    const nurse = await Nurse.findOne({ nurseID: req.params.id });
    if (!nurse) {
      return res.status(404).send({ message: 'Nurse not found' });
    }
    res.status(200).send(nurse);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllNurses = async (req, res) => {
  try {
    const nurses = await Nurse.find();
    res.status(200).send(nurses);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateNurse = async (req, res) => {
  try {
    // Update using custom nurseID instead of _id
    const nurse = await Nurse.findOneAndUpdate(
      { nurseID: req.params.id },  // Query by nurseID
      req.body,
      { new: true }                // Return updated document
    );
    if (!nurse) {
      return res.status(404).send({ message: 'Nurse not found' });
    }
    res.status(200).send(nurse);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteNurse = async (req, res) => {
  try {
    // Delete using custom nurseID instead of _id
    const nurse = await Nurse.findOneAndDelete({ nurseID: req.params.id });
    if (!nurse) {
      return res.status(404).send({ message: 'Nurse not found' });
    }
    res.status(200).send({ message: 'Nurse deleted' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


module.exports = {
  addNurse,
  getNurseById,
  getAllNurses,
  updateNurse,
  deleteNurse,
};
