require('dotenv').config()
const express = require('express')
const app = express();
const passport = require('passport');
var bodyParser = require('body-parser');
const { MongoError } = require('mongodb');
// require('./models/index');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));                               
app.use(bodyParser.json({ type: 'application/json'}));  
app.use(passport.initialize());

const devsContactRoutes = require('./routes/contactroutes');
const devsCategoryRoutes = require('./routes/categoryroutes');
const authRoutes = require('./routes/authroutes');
const port = 3000

app.use('/auth', authRoutes);
app.use('/contact', devsContactRoutes);
app.use('/category', devsCategoryRoutes);
app.use((req, res, next) => {
    const err = new Error('Route Not Found');
    err.status = 404;
    next(err);
  });

  //Catch Exceptions outside the Express context
process.on('uncaughtException', function(err){
    console.log('Fatal Error ' + err)
    //Log to Database or File
})
process.on('unhandledRejection', function(err){
    console.log('Error handler returned an error :)' + err)
})
  // error handler
app.use(function(err, req, res, next) { 
    res.status(err.status || 500);
    if (err instanceof MongoError) {
      return res.status(503).json({
        message: err.message
      });
    }
    
    res.json({'message': err.message});
  });
app.listen(port, () => console.log(`listening on port ${port}!`))

module.exports = app;