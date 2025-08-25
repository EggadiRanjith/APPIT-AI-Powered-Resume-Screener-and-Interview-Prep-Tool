const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

class FileParserService {
  static async extractTextFromPDF(buffer) {
    try {
      const data = await pdfParse(buffer);
      return data.text;
    } catch (error) {
      throw new Error('Failed to parse PDF file: ' + error.message);
    }
  }

  static async extractTextFromDOCX(buffer) {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (error) {
      throw new Error('Failed to parse DOCX file: ' + error.message);
    }
  }

  static async parseResumeFile(file) {
    const { buffer, mimetype, originalname } = file;
    
    let extractedText = '';
    
    if (mimetype === 'application/pdf') {
      extractedText = await this.extractTextFromPDF(buffer);
    } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      extractedText = await this.extractTextFromDOCX(buffer);
    } else {
      throw new Error('Unsupported file format. Please upload PDF or DOCX files only.');
    }

    if (!extractedText.trim()) {
      throw new Error('No text could be extracted from the file. Please ensure the file contains readable text.');
    }

    return {
      text: extractedText.trim(),
      fileName: originalname,
    };
  }
}

module.exports = FileParserService;
