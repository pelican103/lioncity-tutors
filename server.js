const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:5173', // allow frontend dev server
  methods: ['GET', 'POST'],
  credentials: true
}));

// ✅ Middleware to parse JSON
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));


const tutorSchema = new mongoose.Schema({
  // Personal Information
  fullName: String,
  contactNumber: String,
  email: String,
  dob: {
    day: String,
    month: String,
    year: String
  },
  gender: String,
  age: String,
  nationality: String,
  nationalityOther: String,
  race: String,
  nricLast4: String,
  
  // Tutoring Preferences
  teachingLevels: {
    primary: {
      english: Boolean,
      math: Boolean,
      science: Boolean,
      chinese: Boolean,
      malay: Boolean,
      tamil: Boolean
    },
    secondary: {
      english: Boolean,
      math: Boolean,
      aMath: Boolean,
      eMath: Boolean,
      physics: Boolean,
      chemistry: Boolean,
      biology: Boolean,
      science: Boolean,
      history: Boolean,
      geography: Boolean,
      literature: Boolean,
      chinese: Boolean,
      malay: Boolean,
      tamil: Boolean
    },
    jc: {
      generalPaper: Boolean,
      h1Math: Boolean,
      h2Math: Boolean,
      h1Physics: Boolean,
      h2Physics: Boolean,
      h1Chemistry: Boolean,
      h2Chemistry: Boolean,
      h1Biology: Boolean,
      h2Biology: Boolean,
      h1Economics: Boolean,
      h2Economics: Boolean,
      h1History: Boolean,
      h2History: Boolean
    },
    international: {
      ib: Boolean,
      igcse: Boolean,
      ielts: Boolean,
      toefl: Boolean
    }
  },
  
  // Locations
  locations: {
    north: Boolean,
    south: Boolean,
    east: Boolean,
    west: Boolean,
    central: Boolean,
    northeast: Boolean,
    northwest: Boolean
  },
  
  // Qualifications & Experience
  tutorType: String,
  yearsOfExperience: String,
  highestEducation: String,
  currentSchool: String,
  previousSchools: String,
  
  // Fee Structure
  hourlyRate: {
    primary: String,
    secondary: String,
    jc: String,
    international: String
  },
  
  // Tutor Profile
  introduction: String,
  teachingExperience: String,
  trackRecord: String,
  sellingPoints: String,
  
  // Availability
  availableTimeSlots: {
    weekdayMorning: Boolean,
    weekdayAfternoon: Boolean,
    weekdayEvening: Boolean,
    weekendMorning: Boolean,
    weekendAfternoon: Boolean,
    weekendEvening: Boolean
  },
  
  // Form metadata
  formType: String
}, { timestamps: true });

const Tutor = mongoose.model('Tutor', tutorSchema);


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
app.post('/api/requestfortutor', (req, res) => {
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

app.post('/api/registerfortutor', async (req, res) => {
  try {
    const newTutor = new Tutor(req.body);
    await newTutor.save();
    res.status(200).json({ message: 'Tutor registration saved successfully!' });
  } catch (err) {
    console.error('Failed to save tutor registration:', err);
    res.status(500).json({ error: 'Failed to register tutor.' });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});