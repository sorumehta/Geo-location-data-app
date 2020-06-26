const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user_data = decoded;

    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
    next();
}