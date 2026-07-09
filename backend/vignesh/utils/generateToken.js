const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, 'studyconnectsecret', { expiresIn: '30d' });
};

module.exports = generateToken;
