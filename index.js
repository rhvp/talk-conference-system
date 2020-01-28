require('dotenv').config();
const express =  require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('./config/mongoose');

const port = process.env.PORT || 5500;

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(require('./api/routes'));

app.listen(port, ()=>{
    console.log('Now Listening at: ' + 5500);
})