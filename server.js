const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;
require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:5173', // allow frontend dev server
  methods: ['GET', 'POST'],
  credentials: true
}));
'REDACTED_MONGO_URI'
// ✅ Middleware to parse JSON
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/api/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(200).json({ message: 'Saved to database!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save to database' });
  }
});


// Root route
app.get('/', (req, res) => {
  res.send('Contact form API is running');
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Log received data
  console.log('Form submission received:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);
  
  // In a real application, you would save this to a database
  // or forward it via email
  
  // Send success response
  res.status(200).json({ 
    success: true, 
    message: 'Form submitted successfully' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});