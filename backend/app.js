const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


const property = require('./routes/property');
const local = require('./routes/local');
const auth = require('./routes/auth');
const allocated = require('./routes/allocatedProperty');

app.use('/api/v1', property);
app.use('/api/v1', local);
app.use('/api/v1', auth);
app.use('/api/v1', allocated);


module.exports = app;