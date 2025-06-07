const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://www.lioncitytutors.com',
    'https://lioncitytutors.com',
    'http://www.lioncitytutors.com',
    'http://lioncitytutors.com'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true
}));

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
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  level: { type: String, required: true },
  school: { type: String },
  
  // Lesson details
  lessonDuration: { type: String, default: "1.5 Hours" },
  customDuration: { type: String },
  lessonFrequency: { type: String, default: "1 Lesson/Week" },
  customFrequency: { type: String },
  preferredTime: { type: String },
  
  // Tutor preferences
  tutorType: {
    partTime: { type: Boolean, default: false },
    fullTime: { type: Boolean, default: false },
    moeTeacher: { type: Boolean, default: false }
  },
  
  // Budget information
  budget: {
    marketRate: { type: Boolean, default: true },
    custom: { type: Boolean, default: false },
    customAmount: { type: String }
  },
  
  // Additional preferences
  genderPreference: { type: String, default: "No preference" },
  bilingualRequired: { type: String, default: "No" },
  preferences: { type: String }
}, { timestamps: true }); // timestamps will auto add createdAt and updatedAt fields


const Contact = mongoose.model('Contact', contactSchema);

// New schema for test paper leads
const testPaperLeadSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  downloads: [{
    subject: String,   
    year: String,      
    level: String,   
    downloadedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const TestPaperLead = mongoose.model('TestPaperLead', testPaperLeadSchema);

// Root route
app.get('/', (req, res) => {
  res.send('Contact form API is running');
});

app.get("/keep-alive", (req, res) => {
  res.status(200).send("Backend is awake");
});

// Contact form endpoint
app.post('/api/requestfortutor', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(200).json({ success: true, message: 'Form submitted and saved successfully!' });
  } catch (err) {
    console.error('Error saving form:', err);
    res.status(500).json({ success: false, error: 'Failed to save form submission.' });
  }
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

// Test paper leads endpoint
app.post('/api/test-paper-leads', async (req, res) => {
  try {
    const { email, phone, subject, year, level } = req.body;
    
    // Find existing lead or create new one
    let lead = await TestPaperLead.findOne({ email });
    
    if (lead) {
      // Add new download to existing lead
      lead.downloads.push({ subject, year, level });
      await lead.save();
    } else {
      // Create new lead
      lead = new TestPaperLead({
        email,
        phone,
        downloads: [{ subject, year, level }]
      });
      await lead.save();
    }
    
    res.status(200).json({ success: true, message: 'Download tracked successfully!' });
  } catch (err) {
    console.error('Error tracking download:', err);
    res.status(500).json({ success: false, error: 'Failed to track download.' });
  }
});

app.get('/api/analytics/popular-papers', async (req, res) => {
  try {
    const leads = await TestPaperLead.find({});
    
    // Count downloads by subject, level, year
    const analytics = {};
    
    leads.forEach(lead => {
      lead.downloads.forEach(download => {
        const key = `${download.level}-${download.subject}-${download.year}`;
        analytics[key] = (analytics[key] || 0) + 1;
      });
    });
    
    // Sort by popularity
    const sorted = Object.entries(analytics)
      .map(([paper, count]) => ({ paper, count }))
      .sort((a, b) => b.count - a.count);
    
    res.json(sorted);
  } catch (err) {
    console.error('Error getting analytics:', err);
    res.status(500).json({ error: 'Failed to get analytics.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'my-tuition-site/dist'))); // Adjust path if needed
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'my-tuition-site/dist', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});