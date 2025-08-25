# Backend - Node.js API Server

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

The backend API server for APPIT - AI-Powered Resume Screener and Interview Prep Tool. Built with Node.js, Express.js, and MongoDB.

## 🚀 Features

### Core API Functionality
- **User Authentication**: JWT-based login/registration system
- **Resume Processing**: PDF/DOCX file upload and text extraction
- **Analysis Management**: Store and retrieve analysis results
- **History Tracking**: Complete user analysis history
- **AI Integration**: Communication with Python FastAPI AI service
- **File Management**: Secure file upload and storage

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Comprehensive request validation
- **File Validation**: Type and size restrictions for uploads
- **CORS Protection**: Cross-origin request security
- **Rate Limiting**: API request throttling

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **File Processing**: Multer for uploads, pdf-parse for PDF extraction
- **Document Processing**: mammoth for DOCX files
- **Validation**: express-validator
- **Logging**: Custom logger utility
- **Environment**: dotenv for configuration

## 📁 Project Structure

```
backend-nodejs/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── controllers/
│   │   ├── analysis.controller.js # Analysis-related endpoints
│   │   ├── auth.controller.js     # Authentication endpoints
│   │   └── user.controller.js     # User management endpoints
│   ├── middleware/
│   │   ├── auth.middleware.js     # JWT authentication middleware
│   │   ├── upload.middleware.js   # File upload middleware
│   │   └── validation.middleware.js # Request validation
│   ├── models/
│   │   ├── analysis.model.js      # Analysis data schema
│   │   └── user.model.js          # User data schema
│   ├── routes/
│   │   ├── analysis.routes.js     # Analysis API routes
│   │   ├── auth.routes.js         # Authentication routes
│   │   └── user.routes.js         # User management routes
│   ├── services/
│   │   ├── aiService.js           # AI service communication
│   │   ├── resumeAnalysis.service.js # Resume processing logic
│   │   └── user.service.js        # User business logic
│   ├── utils/
│   │   ├── fileUtils.js           # File processing utilities
│   │   └── logger.js              # Logging utility
│   └── app.js                     # Express app configuration
├── uploads/                       # File upload directory
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies and scripts
└── server.js                      # Server entry point
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18 or higher
- MongoDB database (local or cloud)
- npm or yarn package manager

### Installation Steps

1. **Navigate to backend directory**
   ```bash
   cd backend-nodejs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/appit
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   AI_SERVICE_URL=http://localhost:8000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud service
   ```

5. **Run development server**
   ```bash
   npm run dev
   # or
   npm start
   ```

6. **Verify installation**
   Navigate to [http://localhost:5000/api/health](http://localhost:5000/api/health)

## 🔧 Available Scripts

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## 🗄️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Analysis Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  resumeFileName: String,
  resumeText: String,
  jobDescription: String,
  fitScore: Number (0-100),
  missingSkills: [String],
  matchingSkills: [String],
  recommendations: [String],
  interviewQuestions: [String],
  aiResponse: Object,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST `/api/auth/login`
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### GET `/api/auth/me`
Get current authenticated user information.

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Analysis Routes (`/api/analysis`)

#### POST `/api/analysis/analyze`
Submit resume and job description for AI analysis.

**Headers:**
```
Authorization: Bearer jwt-token-here
Content-Type: multipart/form-data
```

**Request Body (FormData):**
```
resume: File (PDF or DOCX)
jobDescription: String
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "id": "analysis-id",
    "fitScore": 85,
    "missingSkills": ["React", "TypeScript"],
    "matchingSkills": ["JavaScript", "Node.js"],
    "recommendations": ["Add React experience", "Learn TypeScript"],
    "interviewQuestions": [
      "Tell me about your JavaScript experience",
      "How would you handle state management?"
    ]
  }
}
```

#### GET `/api/analysis/history`
Get user's analysis history with pagination.

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Query Parameters:**
```
page: Number (default: 1)
limit: Number (default: 10)
```

**Response:**
```json
{
  "success": true,
  "analyses": [
    {
      "id": "analysis-id",
      "resumeFileName": "resume.pdf",
      "fitScore": 85,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalAnalyses": 50
  }
}
```

#### GET `/api/analysis/:id`
Get specific analysis details.

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "id": "analysis-id",
    "resumeFileName": "resume.pdf",
    "jobDescription": "Full job description text...",
    "fitScore": 85,
    "missingSkills": ["React", "TypeScript"],
    "matchingSkills": ["JavaScript", "Node.js"],
    "recommendations": ["Add React experience"],
    "interviewQuestions": ["Tell me about your experience"],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

## 🔐 Authentication Middleware

### JWT Token Verification
```javascript
// Middleware to verify JWT tokens
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. No token provided.' 
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token.' 
    });
  }
};
```

## 📁 File Upload System

### Configuration
```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and DOCX files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});
```

## 🤖 AI Service Integration

### Communication with Python AI Service
```javascript
const axios = require('axios');

class AIService {
  constructor() {
    this.baseURL = process.env.AI_SERVICE_URL || 'http://localhost:8000';
  }

  async analyzeResume(resumeText, jobDescription) {
    try {
      const response = await axios.post(`${this.baseURL}/analyze`, {
        resume_text: resumeText,
        job_description: jobDescription
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`AI Service Error: ${error.message}`);
    }
  }
}
```

## 🔍 Text Extraction

### PDF Processing
```javascript
const pdfParse = require('pdf-parse');

const extractPDFText = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    throw new Error('Failed to extract text from PDF');
  }
};
```

### DOCX Processing
```javascript
const mammoth = require('mammoth');

const extractDOCXText = async (filePath) => {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    throw new Error('Failed to extract text from DOCX');
  }
};
```

## 🛡️ Security Features

### Password Hashing
```javascript
const bcrypt = require('bcryptjs');

// Hash password before saving
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

// Compare password during login
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
```

### Input Validation
```javascript
const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];
```

## 📊 Error Handling

### Global Error Handler
```javascript
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};
```

## 🧪 Testing

### Test Setup
```bash
# Install testing dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

### Example Test
```javascript
const request = require('supertest');
const app = require('../src/app');

describe('Auth Endpoints', () => {
  test('POST /api/auth/register', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
  });
});
```

## 🚀 Deployment

### Production Configuration
```javascript
// Production environment variables
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/appit
JWT_SECRET=your-production-jwt-secret
AI_SERVICE_URL=https://your-ai-service-domain.com
```

### PM2 Process Manager
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name "appit-backend"

# Monitor processes
pm2 monit

# Restart application
pm2 restart appit-backend
```

### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

## 🔧 Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/appit

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# External Services
AI_SERVICE_URL=http://localhost:8000

# File Upload
MAX_FILE_SIZE=10485760  # 10MB in bytes
UPLOAD_PATH=./uploads

# Logging
LOG_LEVEL=info
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Check MongoDB status
   sudo systemctl status mongod
   
   # Start MongoDB
   sudo systemctl start mongod
   ```

2. **JWT Token Issues**
   ```bash
   # Verify JWT_SECRET is set
   echo $JWT_SECRET
   
   # Check token expiration
   ```

3. **File Upload Problems**
   ```bash
   # Check uploads directory permissions
   ls -la uploads/
   
   # Create uploads directory if missing
   mkdir uploads
   chmod 755 uploads
   ```

4. **AI Service Connection**
   ```bash
   # Test AI service connectivity
   curl http://localhost:8000/health
   ```

## 📈 Performance Optimization

- **Database Indexing**: Optimize MongoDB queries
- **Connection Pooling**: Efficient database connections
- **Caching**: Redis for session and data caching
- **Compression**: Gzip compression for responses
- **Rate Limiting**: Prevent API abuse

## 🤝 Contributing

1. Follow Node.js best practices
2. Use consistent error handling
3. Add comprehensive logging
4. Write unit and integration tests
5. Document API changes
6. Use semantic versioning

## 📚 Resources

- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/guide)
- [MongoDB Manual](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com/docs)
- [JWT.io](https://jwt.io)

---

**Built with ❤️ using Node.js, Express.js, and MongoDB**
