const { json } = require('body-parser');
const express = require('express');
const dbConnection = require('./config/db');
const ActorRouter = require('./src/actors/routes/actor.routes');

const CompanyRouter = require('./src/companies/routes/company.routes');
const app = express();




/*Public middleware*/ 
app.use(express.json());


dbConnection();
app.use(CompanyRouter);
app.use(ActorRouter);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(process.env.PORT || 5000)