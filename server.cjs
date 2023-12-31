require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
require('./config/database.cjs');

const app = express();

app.use(logger('dev'));

app.use(express.json());
// Configure both serve-favicon & static middleware
// to serve from the production 'dist' folder
app.use(favicon(path.join(__dirname, 'dist', 'vite.svg')));
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware to verify token and assign user object of payload to req.user.
// Be sure to mount before routes
app.use(require('./config/checkToken.cjs'));

app.use('/api/users', require('./routes/api/users.cjs'));
// Protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn.cjs');
app.use('/api/items', ensureLoggedIn, require('./routes/api/items.cjs'));
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders.cjs'));

// // The following "catch all" route (note the *) is necessary
// // to return the index.html on all non-AJAX requests
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
