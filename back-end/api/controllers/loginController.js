let login = require('../models/loginModel');

exports.login = (req, res) => {
  for (let index in login.registeredUsers) {
    const user = login.registeredUsers[index];
    if (user.username === req.body.username && user.password === req.body.password) {
      res.json({ success: true, admin: user.admin, token: user.token });
      return;
    }
  }
  res.json({ success: false, admin: false, token: '' });
};

exports.check = (req, res) => {
  for (let index in login.registeredUsers) {
    const user = login.registeredUsers[index];
    if (user.token === req.body.token) {
      res.json({ success: true, admin: user.admin });
      return;
    }
  }
  res.json({ success: false, admin: false });
}
