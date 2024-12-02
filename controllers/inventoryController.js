const Inventory = require('../models/Inventory');

// 1. Fetch All Inventory Items
// 1. Fetch All Inventory Items
const getAllInventoryItems = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inventory items', error: err.message });
  }
};

// 2. Add a New Medicine
const addMedicine = async (req, res) => {
  try {
    const { medicineID, name, quantity, expiryDate } = req.body;

    // Create new medicine entry
    const newMedicine = {
      medicineID,
      name,
      quantity,
      expiryDate,
    };

    // Ensure that inventory exists, or create a new one
    let inventory = await Inventory.findOne({});
    if (!inventory) {
      // If no inventory exists, create a new one
      inventory = new Inventory({
        medicines: [newMedicine],
      });
      await inventory.save();
    } else {
      // Otherwise, update the existing inventory
      inventory = await Inventory.findOneAndUpdate(
        {},
        { $push: { medicines: newMedicine } },
        { new: true, upsert: true }
      );
    }

    res.status(201).json(inventory);
  } catch (err) {
    res.status(500).json({ message: 'Error adding medicine', error: err.message });
  }
};

// 3. Remove a Medicine by ID
const removeMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const inventory = await Inventory.findOneAndUpdate(
      {},
      { $pull: { medicines: { medicineID: id } } },
      { new: true }
    );

    if (!inventory) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json({ message: 'Medicine removed successfully', inventory });
  } catch (err) {
    res.status(500).json({ message: 'Error removing medicine', error: err.message });
  }
};

// 4. Fetch a Specific Inventory Item by ID
const getInventoryItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findOne({ 'medicines.medicineID': id }, { 'medicines.$': 1 });

    if (!inventory) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json(inventory.medicines[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching medicine', error: err.message });
  }
};

// 5. Update Medicine Details
const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, expiryDate } = req.body;

    const inventory = await Inventory.findOneAndUpdate(
      { 'medicines.medicineID': id },
      { $set: { 'medicines.$.name': name, 'medicines.$.quantity': quantity, 'medicines.$.expiryDate': expiryDate } },
      { new: true }
    );

    if (!inventory) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ message: 'Error updating medicine', error: err.message });
  }
};


module.exports = {
  getAllInventoryItems,
  addMedicine,
  removeMedicine,
  getInventoryItemById,
  updateMedicine,
};
