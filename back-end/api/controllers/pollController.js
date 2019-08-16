let poll = require('../models/pollModel');

exports.createPoll = (req, res) => {
  poll.question = req.body.question;
  poll.yesVotes = 0;
  poll.noVotes = 0;
  res.json(poll);
};

exports.getCurrentPoll = (req, res) => {
  res.json(poll);
};

exports.addVote = (req, res) => {
  poll.yesVotes++;
  res.json(poll);
};

exports.removeVote = (req, res) => {
  poll.noVotes++;
  res.json(poll);
};

exports.end = (req, res) => {
  poll.question = 'undefined';
  poll.yesVotes = 0;
  poll.noVotes = 0;
  res.json({ success: true });
}
