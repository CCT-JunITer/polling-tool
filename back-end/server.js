const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  poll = require('./api/models/pollModel'),
  cors = require('cors'),
  bodyParser = require('body-parser')
  path = require('path');

app.use(cors());

app.use(express.static(__dirname + '/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pollRoutes = require('./api/routes/pollRoutes');
pollRoutes(app);

require('./api/models/loginModel');
const loginRoutes = require('./api/routes/loginRoutes');
loginRoutes(app);

/*
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
*/

app.listen(port, () => {
  console.log(`Poll RESTful API server started on ${port}`);
});
