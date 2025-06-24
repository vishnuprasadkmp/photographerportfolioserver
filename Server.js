const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDb } = require('./config/db');
require('dotenv').config();

const postRouting = require('./Router/postRouter');
const userRouting = require('./Router/userRouter');

const app = express();
const PORT = process.env.PORT || 5000;

// DB Connection
connectDb();

app.use(cors({
  origin: ['http://localhost:5173', 'https://photographerportfolio-vij5.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// JSON parsing
app.use(express.json());

// Static files
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API Routes
app.use('/api', postRouting);
app.use('/user', userRouting);

// Default route
app.get('/', (req, res) => {
  res.send('Hello from Post App!');
});

// Start server
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${PORT}`);
});
