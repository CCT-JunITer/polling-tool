module.exports = (app) => {
  const login = require('../controllers/loginController');

  app.route('/login')
    .post(login.login);

  app.route('/check')
    .post(login.check);
};
