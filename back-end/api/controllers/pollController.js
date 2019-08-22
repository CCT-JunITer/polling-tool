let poll = require('../models/pollModel');

exports.createPoll = (req, res) => {
  poll.question = req.body.question;
  poll.yesVotes = 0;
  poll.noVotes = 0;
  poll.answers = req.body.answers;
  res.json(poll);
};

exports.getCurrentPoll = (req, res) => {
  res.json(poll);
};

exports.vote = (req, res) => {
  for (index in poll.answers) {
    const answer = poll.answers[index];
    if (answer.answer.trim() === req.body.answer.trim()) {
      answer.votes += 1;
    }
  }
  res.json(poll);
};

exports.end = (req, res) => {
  poll.question = 'undefined';
  poll.yesVotes = 0;
  poll.noVotes = 0;
  poll.whoVoted = [];
  poll.answers = [];
  res.json({ success: true });
};
