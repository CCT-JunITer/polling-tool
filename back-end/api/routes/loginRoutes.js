module.exports = (app) => {
  const login = require('../controllers/loginController');

  app.route('/api/login')
    .post(login.login);

  app.route('/api/check')
    .post(login.check);
};
