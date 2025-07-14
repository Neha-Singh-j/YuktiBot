const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Question = require('../models/Question');

// Create question (Interviewer only)
router.post('/questions', auth, async (req, res) => {
  try {
    const { title, description, difficulty, testCases } = req.body;
    
    const question = new Question({
      title,
      description,
      difficulty,
      testCases,
      createdBy: req.user.id
    });

    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all questions
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;