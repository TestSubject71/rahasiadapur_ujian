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

// --- MONGODB CONNECTION CACHING ---
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Prevents the 'buffering timed out' error
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongooseInstance) => {
      console.log("✅ MongoDB Connected Successfully");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Middleware to ensure DB is connected before handling any route
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ Database Connection Error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});
// ----------------------------------

// Routes
app.use('/', authRoutes);
app.use('/recipes', recipeRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Backend is live and running on Vercel!');
});

// Start Server (Local Development)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on port ${PORT}`);
  });
}

// REQUIRED: Export for Vercel
module.exports = app;