require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 8000;

//db
mongoose
  .connect(process.env.MONGO_CONNECT_STIRNG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('Connected to mongoose');
  })
  .catch((err) => console.error(err.message));

// middlewares

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200), json(`Server works at port ${PORT}`);
});

fs.readdirSync('./routes').map((r) => app.use(require('./routes/' + r)));

app.listen(PORT, console.log(`Server running on port ${PORT}`));
