const Analysis = require('../models/analysis.model');
const FileParserService = require('../services/fileParser.service');
const ResumeAnalysisService = require('../services/resumeAnalysis.service');

const analyzeResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const userId = req.user.id;

    // Validate inputs
    if (!req.file) {
      return res.status(400).json({ msg: 'Resume file is required' });
    }

    if (!jobDescription || jobDescription.trim().length === 0) {
      return res.status(400).json({ msg: 'Job description is required' });
    }

    // Parse resume file
    const { text: resumeText, fileName } = await FileParserService.parseResumeFile(req.file);

    // Analyze resume against job description
    const analysisService = new ResumeAnalysisService();
    const analysisResult = await analysisService.analyzeResume(resumeText, jobDescription);

    // Save analysis to database
    const analysis = new Analysis({
      userId,
      resumeFileName: fileName,
      resumeText,
      jobDescription,
      fitScore: analysisResult.fitScore,
      matchingKeywords: analysisResult.matchingKeywords,
      missingKeywords: analysisResult.missingKeywords,
      suggestions: analysisResult.suggestions,
      analysis: analysisResult.analysis,
      interviewQuestions: analysisResult.interviewQuestions,
    });

    await analysis.save();

    // Return analysis results
    res.json({
      success: true,
      analysisId: analysis._id,
      fitScore: analysisResult.fitScore,
      matchingKeywords: analysisResult.matchingKeywords,
      missingKeywords: analysisResult.missingKeywords,
      suggestions: analysisResult.suggestions,
      analysis: analysisResult.analysis,
      interviewQuestions: analysisResult.interviewQuestions,
      resumeFileName: fileName,
    });

  } catch (error) {
    console.error('Resume analysis error:', error);
    res.status(500).json({ 
      success: false,
      msg: error.message || 'Analysis failed' 
    });
  }
};

const getAnalysisHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const analyses = await Analysis.find({ userId })
      .select('-resumeText -jobDescription') // Exclude large text fields for list view
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Analysis.countDocuments({ userId });

    res.json({
      success: true,
      analyses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Get analysis history error:', error);
    res.status(500).json({ 
      success: false,
      msg: 'Failed to retrieve analysis history' 
    });
  }
};

const getAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const analysis = await Analysis.findOne({ _id: id, userId });

    if (!analysis) {
      return res.status(404).json({ 
        success: false,
        msg: 'Analysis not found' 
      });
    }

    res.json({
      success: true,
      analysis,
    });

  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({ 
      success: false,
      msg: 'Failed to retrieve analysis' 
    });
  }
};

const deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const analysis = await Analysis.findOneAndDelete({ _id: id, userId });

    if (!analysis) {
      return res.status(404).json({ 
        success: false,
        msg: 'Analysis not found' 
      });
    }

    res.json({
      success: true,
      msg: 'Analysis deleted successfully',
    });

  } catch (error) {
    console.error('Delete analysis error:', error);
    res.status(500).json({ 
      success: false,
      msg: 'Failed to delete analysis' 
    });
  }
};

module.exports = {
  analyzeResume,
  getAnalysisHistory,
  getAnalysisById,
  deleteAnalysis,
};
