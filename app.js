const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const env = require('dotenv');
env.config();
const router = require('./routes/api');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const userScema = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
const mongoDB = require('mongoose');
mongoDB.connect(process.env.CONNECT_DB, userScema)
    .then(() => { console.log('connected to mongo'); })
    .catch((err) => { console.log('error' + err); });

app.use('/api', router);

app.listen(3020, () => {
    console.log('connected');
});