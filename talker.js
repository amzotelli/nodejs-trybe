const fs = require('fs').promises;

// first verification 
const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
};

// second verification
const verifyName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

// third verification 
const verifyAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

// fourth verification
const verifyRate = (req, res, next) => {
const { talk: { rate } } = req.body;
if (typeof rate !== 'number' || rate < 1 || rate > 5) {
return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
}

next();
};
// fifth verification
const verifySeen = (req, res, next) => {
  const verifyDate = (date) => String(date)
    .match(/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/);
  const { talk: { watchedAt } } = req.body;
  if (!verifyDate(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

// sixth verification
const verifyTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  next();
};

// adding new talker 
const addNewTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const response = await fs.readFile('./talker.json');
  const talker = JSON.parse(response);
  const newTalker = {
    id: talker.length + 1,
    name,
    age,
    talk,
  };
  talker.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talker));
  res.status(201).json(newTalker);
};

module.exports = {
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifySeen,
  verifyRate,
  addNewTalker,
};
