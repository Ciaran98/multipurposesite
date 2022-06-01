const express = require('express');
const connectDB = require('./config/db');
// Initialise express
const app = express();
// Listen for environment variable for port, or use port 5000
const PORT = process.env.PORT || 5000;
// Connect to database
connectDB();
// Init middleware
app.use(express.json({ extended: false }))
// Get request for API
app.get('/',(req,res) => res.send('API Running'));
// Define Routes
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/products',require('./routes/api/products'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/transactions',require('./routes/api/transactions'));
app.use('/api/users',require('./routes/api/users'));
// Run Server
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));