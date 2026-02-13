require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. CONNECT TO DATABASE ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch(err => console.error('❌ Connection Error:', err));

// --- 2. IMPORT ROUTES ---
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');

// --- 3. USE ROUTES ---
// This keeps your URLs the same:
app.use('/', authRoutes);      // accessible at /login and /register
app.use('/recipes', recipeRoutes); // accessible at /recipes and /recipes/:id



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
