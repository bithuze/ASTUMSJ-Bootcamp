// THIS IS THE MAIN ENTRY POINT OF THE BACKEND APPLICATION.

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); // IMPORT MONGOOSE
const projectRoutes = require('./routes/projectRoutes');

// LOAD ENVIRONMENT VARIABLES FROM .ENV FILE
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "MY APP";

// CONNECT TO MONGODB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MONGODB CONNECTED SUCCESSFULLY!');
  } catch (error) {
    console.error('MONGODB CONNECTION ERROR:', error.message);
    process.exit(1); // EXIT WITH FAILURE
  }
};

// CALL THE FUNCTION TO CONNECT TO THE DATABASE
connectDB();

// MIDDLEWARE
app.use(cors()); // ENABLE CORS FOR ALL ROUTES
app.use(express.json()); // PARSE JSON REQUESTS

// ROUTES
app.use('/api/projects', projectRoutes);

// START THE SERVER
app.listen(PORT, () => {
  console.log(`${APP_NAME} IS RUNNING ON PORT ${PORT}`);
});
