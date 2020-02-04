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
app.use((req, res, next)=>{
    const error = new Error('Requested resource does not exist');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


app.listen(port, ()=>{
    console.log('Now Listening at: ' + port);
})