const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

router.post('/', async (req, res) => {
  const { code, language } = req.body;

  try {
    exec(`${language} -e "${code}"`, (error, stdout, stderr) => {
      if (error) {
        return res.status(400).json({ error: stderr });
      }
      res.json({ output: stdout });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;