const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: String,
  company: String,
  status: String,
  value: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lead', LeadSchema);