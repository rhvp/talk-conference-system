const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://'+ process.env.DB_USER +':'+ process.env.DB_PASSWORD + '@my-cluster-01-a0hk3.mongodb.net/talk-conference-DB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(
    res => console.log('Db on mlab connected')
).catch(err=> console.log('Db connection failed:', err.code));

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = mongoose.connection;