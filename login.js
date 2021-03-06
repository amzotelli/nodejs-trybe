const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /\S+@\S+\.\S+/; 
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).send({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

const tokenLogin = (_req, res) => res.status(200).json({ token: '7mqaVRXJSp886CGr' });

module.exports = {
  verifyEmail,
  verifyPassword,
  tokenLogin,
};
