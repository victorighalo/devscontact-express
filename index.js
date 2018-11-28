const express = require('express')
const app = express()
var bodyParser = require('body-parser');
require('./models/devscontact');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const devsContactRoutes = require('./routes');
const port = 3000

app.use('/', devsContactRoutes);
app.listen(port, () => console.log(`listening on port ${port}!`))