const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const mailingRoutes = require('./routes/mailing');
app.use('/mailing', mailingRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const articlesRoutes = require('./routes/articles/articles');
app.use('/articles', articlesRoutes);

// if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
  // }

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})

module.exports = app;