require('dotenv').config();

const express = require('express');

const apiRoute = require('./routes');

const cors = require('cors');

// Start the express application
const app = express();

// Parse incoming data
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Parse json data
app.use(express.json());

// Handle cors error
app.use(cors());

// Set up api for use
app.use('/api', apiRoute);

// Page not found
app.use((req, res, next) => {
  // 404 catch block
  next({
    message: 'Not Found',
    status: 404,
  });
});

// Error handling function
app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    message: err.msg || err.sqlMessage || err,
    status: err.status || 400,
  });
});

app.listen(process.env.PORT, () => {
  console.log('app running on port ', process.env.PORT);
});
