module.exports = (app) => {
  const poll = require('../controllers/pollController');

  app.route('/poll')
    .get(poll.getCurrentPoll)
    .post(poll.createPoll);

  app.route('/poll/vote')
    .post(poll.vote);

  app.route('/poll/end')
    .post(poll.end);
};
