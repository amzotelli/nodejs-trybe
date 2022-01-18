const fs = require('fs').promises;

module.exports = async (req, res) => {
  const talkers = await fs.readFile('./talker.json');
  const talkerJson = JSON.parse(talkers);
  const { id } = req.params;
  const talker = talkerJson.find((talk) => talk.id === +id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
}; 
