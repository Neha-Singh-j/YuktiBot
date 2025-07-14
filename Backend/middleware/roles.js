// middleware/roles.js
const interviewerOnly = (req, res, next) => {
  if (req.user?.role !== 'interviewer') {
    return res.status(403).json({
      error: 'Access denied',
      message: 'Interviewer privileges required'
    });
  }
  next();
};

const candidateOnly = (req, res, next) => {
  if (req.user?.role !== 'candidate') {
    return res.status(403).json({
      error: 'Access denied', 
      message: 'Candidate account required'
    });
  }
  next();
};

module.exports = { interviewerOnly, candidateOnly };