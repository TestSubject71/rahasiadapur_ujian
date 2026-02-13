const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected!"))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send('🚀 Backend Live!'));

if (require.main === module) {
  app.listen(process.env.PORT || 5000);
}

// Routes
app.use('/', authRoutes);
app.use('/recipes', recipeRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Server is running on Vercel!');
});

// Start Server 
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Export for Vercel (REQUIRED)
module.exports = app;