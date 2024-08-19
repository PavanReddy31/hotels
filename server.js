const express = require('express')
const app = express();
const db = require('./db');

const Form = require('./models/forms')
const Menu = require('./models/menu');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRouter = require('./routes/personRoutes');
app.use('/person',personRouter);

const menuRouter = require('./routes/menuRouter');
app.use('/menu',menuRouter);

const formRouter = require('./routes/formRouter');
app.use('/form',formRouter);


// comment added for testing purpose
app.listen(3000,()=>{
    console.log('listening on port 3000')
});