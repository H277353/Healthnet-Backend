const Bed = require('../models/Bed');

// 1. Fetch All Beds
const getAllBeds = async (req, res) => {
  try {
    const beds = await Bed.find();
    res.status(200).json(beds);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bed data', error: err.message });
  }
};

// 2. Add a New Bed
const addBed = async (req, res) => {
  try {
    const { bedID, ward, type, status } = req.body;

    const newBed = new Bed({
      bedID,  // Use custom bedID
      ward,
      type,
      status,
    });

    await newBed.save();
    res.status(201).json({ message: 'Bed added successfully', newBed });
  } catch (err) {
    res.status(500).json({ message: 'Error adding bed', error: err.message });
  }
};

// 3. Update Bed Details
const updateBed = async (req, res) => {
  try {
    const { id } = req.params;  // Custom bedID (replace _id with bedID)
    const { ward, type, status } = req.body;

    const bed = await Bed.findOneAndUpdate(
      { bedID: id },  // Query by custom bedID
      { ward, type, status },
      { new: true }
    );

    if (!bed) {
      return res.status(404).json({ message: 'Bed not found' });
    }

    res.status(200).json({ message: 'Bed updated successfully', bed });
  } catch (err) {
    res.status(500).json({ message: 'Error updating bed', error: err.message });
  }
};

// 4. Remove a Bed by ID
const deleteBed = async (req, res) => {
  try {
    const { id } = req.params;  // Custom bedID (replace _id with bedID)

    const bed = await Bed.findOneAndDelete({ bedID: id });  // Query by custom bedID

    if (!bed) {
      return res.status(404).json({ message: 'Bed not found' });
    }

    res.status(200).json({ message: 'Bed removed successfully', bed });
  } catch (err) {
    res.status(500).json({ message: 'Error removing bed', error: err.message });
  }
};

// 5. Fetch a Specific Bed by ID
const getBedById = async (req, res) => {
  try {
    const { id } = req.params;  // Custom bedID (replace _id with bedID)

    const bed = await Bed.findOne({ bedID: id });  // Query by custom bedID

    if (!bed) {
      return res.status(404).json({ message: 'Bed not found' });
    }

    res.status(200).json(bed);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bed data', error: err.message });
  }
};


module.exports = {
  getAllBeds,
  addBed,
  updateBed,
  deleteBed,
  getBedById,
};
