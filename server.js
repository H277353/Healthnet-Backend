const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const http = require('http');
const { Server } = require('socket.io');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Connection Error:', err));

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

// Import Routes
const hospitalRoutes = require('./routes/hospitalRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const patientRoutes = require('./routes/patientRoutes');
const bedRoutes = require('./routes/bedRoutes');
const queueRoutes = require('./routes/queueRoutes');
const doctorRoutes = require('./routes/doctorRoutes');  // Import doctorRoutes
const nurseRoutes = require('./routes/nurseRoutes');    // Import nurseRoutes

// Use Routes
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/inventories', inventoryRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/beds', bedRoutes);
app.use('/api/queues', queueRoutes);
app.use('/api/doctors', doctorRoutes);  // Add doctorRoutes
app.use('/api/nurses', nurseRoutes);    // Add nurseRoutes

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Function to notify clients
const notifyQueueStatus = (queue) => {
  console.log('Notify function called:', queue);  // Log to check if the function is being called
  io.emit('queueUpdate', queue);  // Emit queue update to all clients
};

// Export the necessary components
module.exports = { server, io, notifyQueueStatus };
