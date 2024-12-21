const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
