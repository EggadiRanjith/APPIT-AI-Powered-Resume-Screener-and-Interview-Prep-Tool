const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  analyzeResume,
  getAnalysisHistory,
  getAnalysisById,
  deleteAnalysis,
} = require('../controllers/analysis.controller');

// @route   POST api/analysis/analyze
// @desc    Analyze resume against job description
// @access  Private
router.post('/analyze', auth, upload.single('resume'), analyzeResume);

// @route   GET api/analysis/history
// @desc    Get user's analysis history
// @access  Private
router.get('/history', auth, getAnalysisHistory);

// @route   GET api/analysis/:id
// @desc    Get specific analysis by ID
// @access  Private
router.get('/:id', auth, getAnalysisById);

// @route   DELETE api/analysis/:id
// @desc    Delete analysis by ID
// @access  Private
router.delete('/:id', auth, deleteAnalysis);

module.exports = router;
