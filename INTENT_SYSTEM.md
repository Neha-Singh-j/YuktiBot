# YuktiBot Intent Management System

This document explains the intent management system implemented in YuktiBot, which provides a structured, scalable way to handle user interactions and responses.

## Overview

The intent system allows YuktiBot to understand user messages and respond appropriately by matching user input against predefined patterns (utterances) and returning corresponding responses.

## Architecture

### Core Components

1. **`intents.json`** - Configuration file containing intent definitions
2. **`IntentHandler`** - Core logic for intent matching and processing
3. **`/api/bot/*`** - REST API endpoints for bot interactions
4. **`ChatBot`** - Frontend component for user interaction

### File Structure

```
YuktiBot/
├── intents.json                    # Intent definitions
├── Backend/
│   ├── utils/
│   │   └── intentHandler.js        # Core intent processing logic
│   ├── routes/
│   │   └── bot.js                  # Bot API endpoints
│   └── test-intents.js             # Test script
└── frontend/src/components/common/
    ├── ChatBot.js                  # Frontend chat component
    └── ChatBot.css                 # Chat component styles
```

## Intent Schema

Each intent in `intents.json` follows this structure:

```json
{
  "intent_name": {
    "utterances": [
      "phrase 1",
      "phrase 2",
      "phrase 3"
    ],
    "response": "Bot response for this intent"
  }
}
```

### Example Intent

```json
{
  "greet": {
    "utterances": ["hi", "hello", "hey", "good morning"],
    "response": "Hello! How can I help you today?"
  }
}
```

## How It Works

### 1. Intent Matching

The system uses fuzzy matching to find the best intent for user input:

- **Exact Match**: Perfect string match (confidence: 1.0)
- **Contains Match**: Input contains utterance or vice versa (confidence: 0.8)
- **Word-based Match**: Partial word matching (confidence: 0.0-0.6)

### 2. Confidence Threshold

- Responses with confidence < 0.3 trigger fallback response
- Fallback: "I didn't quite catch that. Could you rephrase?"

### 3. Debug Mode

In development mode (`NODE_ENV=development`):
- Logs matched intents and confidence scores
- Returns debug information in API responses
- Shows intent details in frontend

## API Endpoints

### POST `/api/bot/chat`
Process user message and return bot response.

**Request:**
```json
{
  "message": "hello",
  "userId": "user123"
}
```

**Response:**
```json
{
  "success": true,
  "response": "Hello! How can I help you today?",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "debug": {
    "matchedIntent": "greet",
    "confidence": 1.0
  }
}
```

### GET `/api/bot/intents`
Get all available intents (development only).

### POST `/api/bot/intents`
Add new intent dynamically.

**Request:**
```json
{
  "intentName": "new_intent",
  "intentData": {
    "utterances": ["new phrase"],
    "response": "New response"
  }
}
```

### POST `/api/bot/reload`
Reload intents from `intents.json` file.

## Usage Examples

### Testing the Intent System

Run the test script:
```bash
cd Backend
node test-intents.js
```

### Adding New Intents

1. **Via JSON file** (recommended for static intents):
   ```json
   {
     "interview_tips": {
       "utterances": [
         "interview tips",
         "how to prepare",
         "interview advice"
       ],
       "response": "Here are some interview tips: 1) Practice coding problems, 2) Review data structures, 3) Mock interviews"
     }
   }
   ```

2. **Via API** (for dynamic intents):
   ```javascript
   fetch('/api/bot/intents', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       intentName: 'custom_intent',
       intentData: {
         utterances: ['custom phrase'],
         response: 'Custom response'
       }
     })
   });
   ```

### Frontend Integration

```javascript
import ChatBot from './components/common/ChatBot';

function App() {
  return (
    <div>
      <ChatBot />
    </div>
  );
}
```

## Best Practices

### 1. Intent Design

- **Be Specific**: Use clear, specific utterances
- **Variety**: Include multiple ways to express the same intent
- **Natural Language**: Use conversational phrases users would actually say
- **Context-Aware**: Consider the interview preparation context

### 2. Response Design

- **Helpful**: Provide actionable information
- **Conversational**: Use natural, friendly tone
- **Specific**: Give relevant, detailed responses
- **Guided**: Suggest next steps when appropriate

### 3. Utterance Examples

**Good:**
```json
{
  "utterances": [
    "help with interview",
    "interview tips",
    "how to prepare for interview",
    "interview advice"
  ]
}
```

**Avoid:**
```json
{
  "utterances": [
    "help",
    "tips",
    "advice"
  ]
}
```

## Extending the System

### 1. Adding New Intent Types

Create specialized intent handlers:

```javascript
// Backend/utils/specializedIntentHandler.js
class SpecializedIntentHandler extends IntentHandler {
  constructor() {
    super();
    this.specializedLogic = {};
  }
  
  addSpecializedLogic(intentName, logic) {
    this.specializedLogic[intentName] = logic;
  }
  
  processInput(userInput) {
    const match = this.findBestMatch(userInput);
    
    if (this.specializedLogic[match.intent]) {
      return this.specializedLogic[match.intent](userInput, match);
    }
    
    return super.processInput(userInput);
  }
}
```

### 2. Advanced Matching

Implement more sophisticated matching algorithms:

```javascript
// Add to IntentHandler class
calculateLevenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}
```

### 3. Context Management

Add conversation context tracking:

```javascript
class ContextualIntentHandler extends IntentHandler {
  constructor() {
    super();
    this.conversationContext = new Map();
  }
  
  processInput(userInput, userId) {
    const context = this.conversationContext.get(userId) || [];
    const response = super.processInput(userInput);
    
    // Update context
    context.push({ input: userInput, response, timestamp: Date.now() });
    this.conversationContext.set(userId, context.slice(-5)); // Keep last 5 exchanges
    
    return response;
  }
}
```

## Troubleshooting

### Common Issues

1. **Intents not loading**: Check file path and JSON syntax
2. **Low confidence matches**: Add more specific utterances
3. **Fallback responses**: Review utterance variety and specificity
4. **API errors**: Check server logs and endpoint configuration

### Debug Mode

Enable debug mode to see detailed matching information:

```javascript
const intentHandler = new IntentHandler(true); // Enable debug mode
```

### Testing

Use the test script to verify intent matching:

```bash
cd Backend
node test-intents.js
```

## Contributing

When contributing to the intent system:

1. **Follow the schema**: Use the established JSON structure
2. **Test thoroughly**: Use the test script to verify new intents
3. **Document changes**: Update this README for new features
4. **Consider context**: Ensure intents fit the interview preparation theme
5. **Be specific**: Use clear, actionable utterances and responses

## Future Enhancements

- **Machine Learning**: Implement ML-based intent classification
- **Multi-language Support**: Add support for multiple languages
- **Voice Integration**: Connect with speech-to-text services
- **Analytics**: Track intent usage and user satisfaction
- **A/B Testing**: Test different response variations

---

For questions or contributions, please refer to the main project README or contact the maintainers. 