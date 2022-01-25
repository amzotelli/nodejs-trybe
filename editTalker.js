const fs = require('fs').promises;

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const response = await fs.readFile('./talker.json', 'utf8');
  const talkers = JSON.parse(response);
  const findId = talkers.findIndex((t) => t.id === +id);
  talkers[findId] = { ...talkers[findId], name, age, talk };
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  res.status(200).json(talkers[findId]);
};

module.exports = {
  editTalker,
};
