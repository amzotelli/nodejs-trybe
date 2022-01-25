const fs = require('fs').promises;

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const response = await fs.readFile('./talker.json');
  const talker = JSON.parse(response);
  const talkerId = talker.filter((t) => t.id !== +id);
  await fs.writeFile('./talker.json', JSON.stringify(talkerId));
  res.status(204).end();
};

module.exports = {
  deleteTalker,
};
