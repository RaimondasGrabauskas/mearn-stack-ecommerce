require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { json } = require('express');

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
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200), json(`Server works at port ${PORT}`);
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
