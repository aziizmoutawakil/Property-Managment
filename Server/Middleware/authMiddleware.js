const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; 


module.exports = (req, res, next) => {
  const token = req.cookies.authToken;  

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    req.user = decoded;
        console.log('Authenticated user:', req.user.username); 
    next();
  });
};

