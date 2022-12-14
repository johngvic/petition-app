const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' })
  }

  const parts = authHeader.split(' ');
  if (!parts.length === 2) {
    return res.status(401).send({ error: 'Token error' })
  }

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatted' })
  }

  let err = null;
  let userId;

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      err = error
    }

    userId = decoded;
  })

  if (err) {
    return res.status(401).send({ error: 'Invalid token' });
  } else {
    req.userId = userId;
  }
}