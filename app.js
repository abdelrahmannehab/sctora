const { json } = require('body-parser');
const express = require('express');
require('dotenv').config()
const dbConnection = require('./config/db');
const ActorRouter = require('./src/actors/routes/actor.routes');
const CompanyRouter = require('./src/companies/routes/company.routes');
const app = express();
const port = process.env.PORT



/*Public middleware*/ 
app.use(express.json());


dbConnection();
app.use(CompanyRouter,ActorRouter);  


app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, ()=>console.log(`Exampple app listening on port ${port}!`))