const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

    try
    {
        const token = req.cookies.token;

        if(!token)
            return res.status(401).json({message: "No token provided"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        req.token = token;
        next();
    }
    catch(e){       
        return res.status(401).json({ message: e.message});
    }
}

module.exports = authenticateToken;