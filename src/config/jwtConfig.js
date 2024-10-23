  const jwt = require('jsonwebtoken');

  const blackList = [];

  const blackListToken = (token) => {
    console.log('Logout e colocou token na blackList -> ', token);
    blackList.push(token);
  }

  const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1H' })

  const verifyToken = (token) => {
    console.log('blackList -> ', blackList)
    if (blackList.includes(token)) {
      console.log('token está na blackList')
      throw new Error('Token inválido!');
    }

    return jwt.verify(token, process.env.JWT_SECRET)
  };


  module.exports = { generateToken, verifyToken, blackListToken };