const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talker = require('./getTalker');
const talkerId = require('./getTalkerId');
// const { verifyEmail, verifyPassword } = require('./login');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talker);

app.get('/talker/:id', talkerId);

// app.post('/login', verifyEmail, verifyPassword);

app.listen(PORT, () => {
  console.log('Online');
});
