
// THIS FILE DEFINES THE MONGODB SCHEMA FOR A PROJECT.

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // REMOVES WHITESPACE FROM BOTH ENDS OF A STRING
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed'], // RESTRICTS THE STATUS TO THESE TWO VALUES
    default: 'ongoing',
  },
}, {
  timestamps: true, // ADDS 'CREATEDAT' AND 'UPDATEDAT' FIELDS AUTOMATICALLY
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;