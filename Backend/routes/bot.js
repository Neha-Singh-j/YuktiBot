const express = require('express');
const router = express.Router();
const IntentHandler = require('../utils/intentHandler');

// Initialize intent handler with debug mode based on environment
const intentHandler = new IntentHandler(process.env.NODE_ENV === 'development');

/**
 * POST /api/bot/chat
 * Process user message and return bot response
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a string'
      });
    }

    // Process the message through intent handler
    const response = intentHandler.processInput(message);
    
    // Get match details for debugging (only in development)
    const matchDetails = process.env.NODE_ENV === 'development' 
      ? intentHandler.findBestMatch(message)
      : null;

    res.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
      ...(matchDetails && {
        debug: {
          matchedIntent: matchDetails.intent,
          confidence: matchDetails.confidence
        }
      })
    });

  } catch (error) {
    console.error('Bot chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      response: "I'm having trouble processing your request right now. Please try again."
    });
  }
});

/**
 * GET /api/bot/intents
 * Get all available intents (for development/debugging)
 */
router.get('/intents', (req, res) => {
  try {
    const intents = intentHandler.getAllIntents();
    res.json({
      success: true,
      intents,
      count: Object.keys(intents).length
    });
  } catch (error) {
    console.error('Error fetching intents:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch intents'
    });
  }
});

/**
 * POST /api/bot/intents
 * Add a new intent dynamically
 */
router.post('/intents', (req, res) => {
  try {
    const { intentName, intentData } = req.body;

    if (!intentName || !intentData || !intentData.utterances || !intentData.response) {
      return res.status(400).json({
        success: false,
        error: 'Intent name, utterances, and response are required'
      });
    }

    intentHandler.addIntent(intentName, intentData);

    res.json({
      success: true,
      message: `Intent '${intentName}' added successfully`,
      intent: intentData
    });

  } catch (error) {
    console.error('Error adding intent:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add intent'
    });
  }
});

/**
 * POST /api/bot/reload
 * Reload intents from file
 */
router.post('/reload', (req, res) => {
  try {
    intentHandler.reloadIntents();
    
    res.json({
      success: true,
      message: 'Intents reloaded successfully',
      intents: intentHandler.getAllIntents()
    });

  } catch (error) {
    console.error('Error reloading intents:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reload intents'
    });
  }
});

module.exports = router; 