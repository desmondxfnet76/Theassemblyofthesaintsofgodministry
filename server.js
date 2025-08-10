<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const  = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Temporary in-memory storage for submitted messages
let messages = [];

// Serve the main HTML file
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'Assemblyofthesaints.html');
    console.log('Serving file from:', filePath); // Debugging line
    res.sendFile(filePath);
});

// Handle contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Add the submitted message to the in-memory storage
    const newMessage = {
        id: messages.length + 1,
        name,
        email,
        message,
        timestamp: new Date(),
    };
    messages.push(newMessage);

    console.log('Received form data:', newMessage);
    res.json({ message: 'Message received!', newMessage });
});

// Add a route to view submitted messages
app.get('/api/messages', (req, res) => {
    res.status(200).json(messages);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
=======
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/assemblyOfSaints', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to The Assembly Of The Saints Of God Ministry Backend!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
>>>>>>> 8c4e8082c0fca59c88a5884fcf4b5061024533db
