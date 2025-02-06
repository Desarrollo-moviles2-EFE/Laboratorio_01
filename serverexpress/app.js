// Load libraries into the environment application
var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Creates application
var app = express();

// Application parser to support JSON data format
app.use(bodyParser.json({ type: 'application/json' }));

// Creates connection with MongoDB for myself into the local environment
mongoose.connect('mongodb://localhost:27017/',{dbName:'dbArticles'});
/*async function connect() {
    await mongoose.connect('mongodb+srv://doadmin:T7328w9zpx4kf60h@db-mongodb-nyc1-22786-4e032f46.mongo.ondigitalocean.com/',
        {dbName: 'dbArticles',
                useNewUrlParser: true,
                useUnifiedTopology: true},error => error ? console.log(error) : console.log('Connected to MongoDB'));
}
connect().catch(error => console.log(error));*/
require('./models/Volcan');

// Creates each route link
var indexRouter = require('./routes/index');
var volcanRouter = require('./routes/volcanes');

// Create all listener for each route link
app.use('/', indexRouter);
app.use('/volcan', volcanRouter);

// Execute local API server and create listener on port 5005
var server = app.listen(5005, () => {
    console.log(`Server is listening on port ${server.address().port}`);
});
