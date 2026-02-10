const express = require('express');
const app = express();

app.use(express.json());

// Temporary in-memory storage
const complaints = [];

// Home route
app.get('/', (req, res) => {
  res.send('Smart Waste Management API is running');
});

// POST: Add complaint
app.post('/complaint', (req, res) => {
  const { name, location, description } = req.body;

  if (!name || !location || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newComplaint = {
    id: complaints.length + 1,
    name,
    location,
    description,
    status: 'Pending'
  };

  complaints.push(newComplaint);

  res.status(201).json({
    message: 'Complaint registered successfully',
    complaint: newComplaint
  });
});

// GET: View all complaints (ADMIN)
app.get('/complaints', (req, res) => {
  res.json(complaints);
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
