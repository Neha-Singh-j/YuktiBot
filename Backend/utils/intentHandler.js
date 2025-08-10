const fs = require('fs');
const path = require('path');

class IntentHandler {
  constructor(debugMode = false) {
    this.intents = {};
    this.debugMode = debugMode;
    this.loadIntents();
  }

  /**
   * Load intents from the JSON file
   */
  loadIntents() {
    try {
      const intentsPath = path.join(__dirname, '../../intents.json');
      const intentsData = fs.readFileSync(intentsPath, 'utf8');
      this.intents = JSON.parse(intentsData);
      
      if (this.debugMode) {
        console.log('✅ Intents loaded successfully:', Object.keys(this.intents));
      }
    } catch (error) {
      console.error('❌ Error loading intents:', error.message);
      this.intents = {};
    }
  }

  /**
   * Calculate similarity between two strings using simple fuzzy matching
   * @param {string} input - User input
   * @param {string} utterance - Intent utterance
   * @returns {number} - Similarity score (0-1)
   */
  calculateSimilarity(input, utterance) {
    const inputLower = input.toLowerCase().trim();
    const utteranceLower = utterance.toLowerCase().trim();
    
    // Exact match
    if (inputLower === utteranceLower) {
      return 1.0;
    }
    
    // Contains match
    if (inputLower.includes(utteranceLower) || utteranceLower.includes(inputLower)) {
      return 0.8;
    }
    
    // Word-based matching
    const inputWords = inputLower.split(/\s+/);
    const utteranceWords = utteranceLower.split(/\s+/);
    
    let matchCount = 0;
    for (const inputWord of inputWords) {
      for (const utteranceWord of utteranceWords) {
        if (inputWord === utteranceWord || 
            inputWord.includes(utteranceWord) || 
            utteranceWord.includes(inputWord)) {
          matchCount++;
        }
      }
    }
    
    if (matchCount > 0) {
      return Math.min(0.6, matchCount / Math.max(inputWords.length, utteranceWords.length));
    }
    
    return 0.0;
  }

  /**
   * Find the best matching intent for user input
   * @param {string} userInput - The user's message
   * @returns {object} - Object containing matched intent and confidence score
   */
  findBestMatch(userInput) {
    if (!userInput || typeof userInput !== 'string') {
      return { intent: null, confidence: 0, response: null };
    }

    let bestMatch = {
      intent: null,
      confidence: 0,
      response: null
    };

    for (const [intentName, intentData] of Object.entries(this.intents)) {
      for (const utterance of intentData.utterances) {
        const similarity = this.calculateSimilarity(userInput, utterance);
        
        if (similarity > bestMatch.confidence) {
          bestMatch = {
            intent: intentName,
            confidence: similarity,
            response: intentData.response
          };
        }
      }
    }

    if (this.debugMode) {
      console.log(`🔍 Input: "${userInput}"`);
      console.log(`🎯 Best match: ${bestMatch.intent} (confidence: ${bestMatch.confidence.toFixed(2)})`);
    }

    return bestMatch;
  }

  /**
   * Process user input and return appropriate response
   * @param {string} userInput - The user's message
   * @returns {string} - Bot response
   */
  processInput(userInput) {
    const match = this.findBestMatch(userInput);
    
    // If confidence is too low, return fallback response
    if (match.confidence < 0.3) {
      return "I didn't quite catch that. Could you rephrase? I can help you with interview preparation, coding practice, or general questions.";
    }
    
    return match.response;
  }

  /**
   * Get all available intents (for debugging/development)
   * @returns {object} - All loaded intents
   */
  getAllIntents() {
    return this.intents;
  }

  /**
   * Add a new intent dynamically
   * @param {string} intentName - Name of the intent
   * @param {object} intentData - Intent data with utterances and response
   */
  addIntent(intentName, intentData) {
    if (intentData.utterances && intentData.response) {
      this.intents[intentName] = intentData;
      
      if (this.debugMode) {
        console.log(`➕ Added new intent: ${intentName}`);
      }
    }
  }

  /**
   * Reload intents from file
   */
  reloadIntents() {
    this.loadIntents();
  }
}

module.exports = IntentHandler; 