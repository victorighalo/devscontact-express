require('dotenv').config()
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
require('./models/index');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));                               
app.use(bodyParser.json({ type: 'application/json'}));  
const devsContactRoutes = require('./routes/contactroutes');
const devsCategoryRoutes = require('./routes/categoryroutes');
const port = 3000

app.use('/contact', devsContactRoutes);
app.use('/category', devsCategoryRoutes);
app.listen(port, () => console.log(`listening on port ${port}!`))

module.exports = app;