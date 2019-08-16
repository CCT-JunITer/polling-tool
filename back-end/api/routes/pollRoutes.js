module.exports = (app) => {
  const poll = require('../controllers/pollController');

  app.route('/poll')
    .get(poll.getCurrentPoll)
    .post(poll.createPoll);

  app.route('/poll/add')
    .post(poll.addVote);

  app.route('/poll/remove')
    .post(poll.removeVote);

  app.route('/poll/end')
    .post(poll.end);
};
