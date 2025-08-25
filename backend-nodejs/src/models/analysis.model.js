const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resumeFileName: {
    type: String,
    required: true,
  },
  resumeText: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  fitScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  matchingKeywords: [{
    type: String,
  }],
  missingKeywords: [{
    type: String,
  }],
  suggestions: [String],
  analysis: {
    strengths: [String],
    weaknesses: [String],
    recommendations: [String]
  },
  interviewQuestions: [String],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Analysis', AnalysisSchema);
