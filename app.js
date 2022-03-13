const { json } = require('body-parser');
const express = require('express');
const dbConnection = require('./config/db');
const app = express();
const userRoutes = require('./src/companies/routes/company.routes');
const port = 5000



/*Public middleware*/ 
app.use(express.json());


dbConnection();
app.use(userRoutes);
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));