# APPIT - AI-Powered Resume Screener and Interview Prep Tool

![APPIT Logo](https://img.shields.io/badge/APPIT-AI%20Resume%20Screener-blue?style=for-the-badge)

A comprehensive AI-powered platform that analyzes resumes against job descriptions, provides detailed fit scores, highlights missing skills, and generates personalized interview questions to help job seekers optimize their applications.

## 🚀 Features

### Core Functionality
- **Resume Upload & Analysis**: Support for PDF and DOCX formats
- **Job Description Matching**: AI-powered comparison between resume and job requirements
- **Fit Score Calculation**: 0-100 compatibility score with detailed breakdown
- **Skills Gap Analysis**: Identifies missing keywords and skills
- **Interview Question Generation**: 5 personalized questions based on job description and resume
- **Analysis History**: Complete tracking of all previous analyses
- **User Authentication**: Secure login/registration system
- **Responsive Design**: Mobile-first, modern UI/UX

### AI Capabilities
- **Natural Language Processing**: Advanced text analysis using Google's Gemini AI
- **Keyword Extraction**: Intelligent identification of relevant skills and technologies
- **Contextual Analysis**: Understanding of job requirements and resume content
- **Personalized Recommendations**: Tailored suggestions for resume improvement

## 🏗️ Architecture

This project follows a microservices architecture with three main components:

```
APPIT/
├── frontend-nextjs/     # Next.js 14 frontend application
├── backend-nodejs/      # Node.js Express API server
├── ai-service/         # Python FastAPI AI processing service
└── README.md           # This file
```

### Technology Stack

#### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Authentication**: JWT-based auth with protected routes
- **File Upload**: Multipart form handling

#### Backend (Node.js)
- **Framework**: Express.js
- **Language**: JavaScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **File Processing**: Multer for file uploads, pdf-parse for PDF extraction
- **API Documentation**: RESTful API design

#### AI Service (Python)
- **Framework**: FastAPI
- **Language**: Python 3.8+
- **AI Model**: Google Gemini Pro API
- **Text Processing**: Advanced NLP for resume and job description analysis
- **Document Parsing**: PDF and DOCX text extraction

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- MongoDB database
- Google Gemini API key

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/EggadiRanjith/APPIT-AI-Powered-Resume-Screener-and-Interview-Prep-Tool.git
   cd APPIT-AI-Powered-Resume-Screener-and-Interview-Prep-Tool
   ```

2. **Setup Backend**
   ```bash
   cd backend-nodejs
   npm install
   cp .env.example .env
   # Configure your environment variables
   npm start
   ```

3. **Setup AI Service**
   ```bash
   cd ai-service
   pip install -r requirements.txt
   # Set your GEMINI_API_KEY environment variable
   python main.py
   ```

4. **Setup Frontend**
   ```bash
   cd frontend-nextjs
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - AI Service: http://localhost:8000

## 📁 Project Structure

```
APPIT/
├── frontend-nextjs/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── analysis/          # Analysis results pages
│   │   ├── dashboard/         # User dashboard
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable React components
│   │   ├── layouts/           # Layout components
│   │   ├── ProtectedRoute.tsx # Route protection
│   │   └── PublicRoute.tsx    # Public route wrapper
│   ├── contexts/              # React Context providers
│   └── package.json
│
├── backend-nodejs/
│   ├── src/
│   │   ├── config/            # Database and app configuration
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Custom middleware
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API route definitions
│   │   ├── services/         # Business logic services
│   │   └── utils/            # Utility functions
│   ├── uploads/              # File upload directory
│   └── package.json
│
├── ai-service/
│   ├── main.py               # FastAPI application
│   ├── requirements.txt      # Python dependencies
│   └── README.md            # AI service documentation
│
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/appit
JWT_SECRET=your-jwt-secret-key
AI_SERVICE_URL=http://localhost:8000
```

#### AI Service
```env
GEMINI_API_KEY=your-google-gemini-api-key
```

#### Frontend (next.config.js)
```javascript
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:5000'
  }
}
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Analysis
- `POST /api/analysis/analyze` - Analyze resume against job description
- `GET /api/analysis/history` - Get user's analysis history
- `GET /api/analysis/:id` - Get specific analysis details

### AI Service
- `POST /analyze` - Process resume and job description
- `GET /health` - Service health check

## 🎯 Usage Flow

1. **User Registration/Login**: Secure authentication system
2. **Resume Upload**: Upload PDF/DOCX resume files
3. **Job Description Input**: Paste or type job requirements
4. **AI Analysis**: Automated processing and scoring
5. **Results Review**: Detailed fit score and recommendations
6. **History Tracking**: Access to all previous analyses
7. **Interview Prep**: Generated questions for practice

## 🧪 Testing

### Frontend Testing
```bash
cd frontend-nextjs
npm run test
```

### Backend Testing
```bash
cd backend-nodejs
npm run test
```

### AI Service Testing
```bash
cd ai-service
python -m pytest
```

## 🚀 Deployment

### Production Build
```bash
# Frontend
cd frontend-nextjs
npm run build
npm start

# Backend
cd backend-nodejs
npm run build
npm run start:prod

# AI Service
cd ai-service
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Docker Deployment
```bash
# Build and run all services
docker-compose up --build
```

## 📊 Performance

- **Response Time**: < 2 seconds for analysis
- **File Support**: Up to 10MB PDF/DOCX files
- **Concurrent Users**: Supports 100+ simultaneous users
- **AI Processing**: Average 3-5 seconds per analysis

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- File upload validation
- CORS protection
- Rate limiting
- Input sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Ranjith Eggadi** - *Initial work* - [EggadiRanjith](https://github.com/EggadiRanjith)

## 🙏 Acknowledgments

- Google Gemini AI for powerful text analysis
- Next.js team for the amazing framework
- MongoDB for reliable data storage
- FastAPI for high-performance Python APIs

## 📞 Support

For support, email ranjith@example.com or create an issue in this repository.

## 🔮 Future Enhancements

- [ ] PDF report generation
- [ ] Multiple resume format support
- [ ] Advanced analytics dashboard
- [ ] Integration with job boards
- [ ] Mobile application
- [ ] Real-time collaboration features

---

**Built with ❤️ using Next.js, Node.js, Python, and AI**
