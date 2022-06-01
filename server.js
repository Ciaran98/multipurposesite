const express = require('express');
const connectDB = require('./config/db');
// Initialise express
const app = express();
// Listen for environment variable for port, or use port 5000
const PORT = process.env.PORT || 5000;
// Connect to database
connectDB();
// Get request for API
app.get('/',(req,res) => res.send('API Running'));

// Run Server
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));