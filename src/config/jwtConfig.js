  const jwt = require('jsonwebtoken');

  const blackList = [];

  const blackListToken = (token) => {
    blackList.push(token);
  }

  const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1H' })

  const verifyToken = (token) => {
    if (blackList.includes(token)) {
      throw new Error('Token inválido!');
    }

    return jwt.verify(token, process.env.JWT_SECRET)
  };


  module.exports = { generateToken, verifyToken, blackListToken };