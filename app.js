const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const mailingRoutes = require('./routes/mailing');
app.use('/mailing', mailingRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})

module.exports = app;