require('dotenv').config()
require('./config')
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.use(jwt({ secret: process.env.JWT_SECRET,
    algorithms: ['RS256'],
    credentialsRequired: false
}));

app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/movies', require('./routes/movies'));
app.use('/slots', require('./routes/slots'));

app.get('/', (req, res) => {
    return res.status(200).send("Hey");
})

app.listen(3100, () => {
    console.log(`App listening at http://localhost:3100`)
})