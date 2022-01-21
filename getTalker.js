const fs = require('fs').promises;

module.exports = async (_req, res) => {
  const talker = await fs.readFile('./talker.json');
  const talkerJson = JSON.parse(talker);
  if (talkerJson.length === 0) return res.status(200).send([]);
  return res.status(200).send(talkerJson);
};
