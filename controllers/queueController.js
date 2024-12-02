const axios = require('axios');
const Queue = require('../models/Queue');

// 1. Fetch All Queues
const getAllQueues = async (req, res) => {
  try {
    const queues = await Queue.find().sort({ createdAt: 1 }); // Oldest first
    res.status(200).json(queues);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching queue data', error: err.message });
  }
};




const { notifyQueueStatus } = require('../server'); // Correctly import notifyQueueStatus from server.js

const addToQueue = async (req, res) => {
  try {
    const { patientID, name, department, status } = req.body;

    const newQueue = new Queue({
      patientID,
      name,
      department,
      status,
    });

    await newQueue.save();
    notifyQueueStatus(newQueue); // Notify clients about the new queue status

    res.status(201).json({ message: 'Patient added to the queue successfully', newQueue });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to queue', error: err.message });
  }
};

// 3. Update Queue Status
const updateQueueStatus = async (req, res) => {
  try {
    const { id } = req.params;  // Custom ID (patientID)
    const { status } = req.body;

    const queue = await Queue.findOneAndUpdate(
      { patientID: id },  // Use patientID for querying
      { status },
      { new: true }
    );

    if (!queue) {
      return res.status(404).json({ message: 'Queue entry not found' });
    }

    res.status(200).json({ message: 'Queue status updated successfully', queue });
  } catch (err) {
    res.status(500).json({ message: 'Error updating queue status', error: err.message });
  }
};

// 4. Remove a Patient from the Queue
const deleteFromQueue = async (req, res) => {
  try {
    const { id } = req.params;  // Custom ID (patientID)

    const queue = await Queue.findOneAndDelete({ patientID: id }); // Use patientID to delete the patient

    if (!queue) {
      return res.status(404).json({ message: 'Queue entry not found' });
    }

    res.status(200).json({ message: 'Patient removed from the queue', queue });
  } catch (err) {
    res.status(500).json({ message: 'Error removing from queue', error: err.message });
  }
};

// 5. Fetch Queue by Department
const getQueueByDepartment = async (req, res) => {
  try {
    const { dept } = req.params;  // Custom department string

    const queue = await Queue.find({ department: dept }).sort({ createdAt: 1 });

    if (queue.length === 0) {
      return res.status(404).json({ message: 'No queue found for this department' });
    }

    res.status(200).json(queue);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching queue by department', error: err.message });
  }
};

// 6. Fetch Bed Availability
const fetchBedAvailability = async (req, res) => {
  try {
    const { department } = req.params;  // Custom department string

    const bedAvailability = await Bed.find({ department }).select('bedNumber isOccupied');
    
    if (!bedAvailability) {
      return res.status(404).json({ message: 'No bed availability data found' });
    }

    res.status(200).json(bedAvailability);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bed availability', error: err.message });
  }
};

// 7. Sync Queue to City-Wide Module
const syncQueueToCityModule = async (req, res) => {
  try {
    const queueData = await Queue.find();  // Fetch all queue data

    // Send data to the city-wide module (replace URL with actual API endpoint)
    const response = await axios.post('http://city-module.kolhapur.gov/api/sync/queues', queueData);

    if (response.status === 200) {
      res.status(200).json({ message: 'Queue data synced successfully', response: response.data });
    } else {
      res.status(500).json({ message: 'Failed to sync queue data', error: response.data });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error syncing queue data', error: err.message });
  }
};

// 8. Update Admission Status
const updateAdmissionStatus = async (req, res) => {
  try {
    const { patientID, admissionStatus } = req.body;

    // Update admission status in the Admission System
    const response = await axios.put(`http://localhost:5000/api/admissions/${patientID}`, { admissionStatus });

    if (response.status === 200) {
      res.status(200).json({ message: 'Admission status updated successfully', response: response.data });
    } else {
      res.status(500).json({ message: 'Failed to update admission status', error: response.data });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating admission status', error: err.message });
  }
};





module.exports = {
  getAllQueues,
  addToQueue,
  updateQueueStatus,
  deleteFromQueue,
  fetchBedAvailability,
  getQueueByDepartment,
  syncQueueToCityModule,
  updateAdmissionStatus,
};
