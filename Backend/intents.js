[
  {
    "intent_name": "RegisterUser",
    "sample_utterances": [
      "I want to sign up for an account",
      "Register me as a new user",
      "Create a new account",
      "Sign me up"
    ],
    "slot_requirements": [
      {"slot_name": "email", "required": true, "types": ["email"]},
      {"slot_name": "password", "required": true, "types": ["string"]},
      {"slot_name": "role", "required": false, "types": ["string"]}
    ]
  },
  {
    "intent_name": "LoginUser",
    "sample_utterances": [
      "I want to log in",
      "Sign in to my account",
      "Login with my credentials",
      "Access my account"
    ],
    "slot_requirements": [
      {"slot_name": "email", "required": true, "types": ["email"]},
      {"slot_name": "password", "required": true, "types": ["string"]}
    ]
  },
  {
    "intent_name": "ExecuteCode",
    "sample_utterances": [
      "Run this code",
      "Execute the following code",
      "Test this program",
      "Compile and run the code"
    ],
    "slot_requirements": [
      {"slot_name": "code", "required": true, "types": ["string"]},
      {"slot_name": "language", "required": true, "types": ["string"]}
    ]
  },
  {
    "intent_name": "CreateQuestion",
    "sample_utterances": [
      "Add a new interview question",
      "Create a question",
      "Submit a new question for interviews",
      "I want to add a question"
    ],
    "slot_requirements": [
      {"slot_name": "title", "required": true, "types": ["string"]},
      {"slot_name": "description", "required": true, "types": ["string"]},
      {"slot_name": "difficulty", "required": true, "types": ["string", "enum"], "enums": ["Easy", "Medium", "Hard"]},
      {"slot_name": "testCases", "required": false, "types": ["array"]}
    ]
  },
  {
    "intent_name": "GetQuestions",
    "sample_utterances": [
      "Show me the interview questions",
      "List all questions",
      "Get the available questions",
      "What are the interview questions?"
    ],
    "slot_requirements": []
  }
]