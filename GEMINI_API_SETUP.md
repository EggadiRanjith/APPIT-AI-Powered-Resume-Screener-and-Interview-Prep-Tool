# Google Gemini API Setup Guide

## Getting Your API Key

1. **Visit Google AI Studio**
   - Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key"
   - Select your Google Cloud project (or create a new one)
   - Copy the generated API key

3. **Configure the AI Service**
   - Open `ai-service/.env` file
   - Replace `your-google-gemini-api-key-here` with your actual API key:
   ```
   GEMINI_API_KEY=AIzaSyC-your-actual-api-key-here
   ```

## API Key Security

⚠️ **Important Security Notes:**
- Never commit your API key to version control
- Keep your `.env` file in `.gitignore`
- Don't share your API key publicly
- Regenerate the key if compromised

## Testing the Setup

1. Start the AI service:
   ```bash
   cd ai-service
   python main.py
   ```

2. Test the API endpoint:
   ```bash
   curl -X POST http://localhost:8000/analyze \
   -H "Content-Type: application/json" \
   -d '{
     "resume_text": "Software Engineer with 3 years experience in Python and React",
     "job_description": "Looking for a Python developer with React experience"
   }'
   ```

## Fallback Analysis

If you don't configure the Gemini API key, the system will use a sophisticated rule-based fallback analysis that:
- Analyzes technical skill matches
- Evaluates experience indicators
- Assesses education relevance
- Provides detailed scoring breakdowns
- Generates actionable recommendations

## API Usage Limits

- Free tier: 60 requests per minute
- For production use, consider upgrading to a paid plan
- Monitor your usage at [Google Cloud Console](https://console.cloud.google.com/)

## Troubleshooting

**Common Issues:**
1. **Invalid API Key**: Ensure the key is copied correctly without extra spaces
2. **Quota Exceeded**: Check your API usage limits
3. **Network Issues**: Verify internet connection and firewall settings

**Error Messages:**
- "API key not configured": Add your key to the `.env` file
- "Analysis failed": Check the AI service logs for detailed error information
