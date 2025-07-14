// models/Question.js
const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: String,
  difficulty: { type: String, enum: ["easy", "medium", "hard"] },
  testCases: [{
    input: String,
    output: String
  }]
});

module.exports = mongoose.model("Question", QuestionSchema);