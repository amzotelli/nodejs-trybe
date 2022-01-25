const fs = require('fs').promises;

const addNewTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const response = await fs.readFile('./talker.json', 'utf8');
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

module.exports = { addNewTalker };
