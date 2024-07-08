const jwt = require('jsonwebtoken'); // Import jsonwebtoken module
const JWT_SECRET = process.env.JWT_SECRET;

const authenticationToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Access denied, no token provided" });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
       
    }
}

module.exports = authenticationToken;
