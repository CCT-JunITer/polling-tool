module.exports = (app) => {
  const poll = require('../controllers/pollController');

  app.route('/api/poll')
    .get(poll.getCurrentPoll)
    .post(poll.createPoll);

  app.route('/api/poll/vote')
    .post(poll.vote);

  app.route('/api/poll/end')
    .post(poll.end);
};
