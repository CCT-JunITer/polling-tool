const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  poll = require('./api/models/pollModel'),
  cors = require('cors'),
  bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pollRoutes = require('./api/routes/pollRoutes');
pollRoutes(app);

require('./api/models/loginModel');
const loginRoutes = require('./api/routes/loginRoutes');
loginRoutes(app);

app.listen(port, () => {
  console.log(`Poll RESTful API server started on ${port}`);
});
