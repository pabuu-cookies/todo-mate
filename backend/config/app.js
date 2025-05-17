const express = require('express');
const cors = require('cors');

const router = require('../routes');
const { handleResponse, handleError } = require('../middlewares');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors()); 

app.get('/', (req, res) => {
  console.log('Root endpoint hit (GET /)');
  res.send('Todo API is running');
});

app.use('/api', router);
app.use(handleResponse);
app.use(handleError);

module.exports = app;