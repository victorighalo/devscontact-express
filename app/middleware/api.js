const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
const token = req.header('x-auth-token');
if(!token) return res.status(401).send('Access denied. Token not provided')
try{
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
}catch(e){
    return res.status(400).send('Invalid Token');
}
}