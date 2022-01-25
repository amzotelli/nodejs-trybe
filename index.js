const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talker = require('./getTalker');
const talkerId = require('./getTalkerId');
const { verifyEmail, verifyPassword, tokenLogin } = require('./login');

const { 
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifySeen,
  verifyRate,
  addNewTalker,
} = require('./talker');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talker);

app.get('/talker/:id', talkerId);

app.post('/login', verifyEmail, verifyPassword, tokenLogin);

app.post('/talker',
  verifyToken, verifyName, verifyAge, verifyTalk, verifySeen, verifyRate, addNewTalker);

app.listen(PORT, () => {
  console.log('Online');
});
