const jwt = require('jsonwebtoken');

const jwtMiddleWare = (req,res,next) =>{

    // check if token is passed or not 

    const authorization = req.headers.authorization
    if(!authorization)
        return res.status(401).json({err:"no authorization token given"});

    // extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({message: 'token not found'});

    try{
        //verify the token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // get the user 
        req.user = decoded;
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({err:'invalid token'});
    }
}

const generateToken = (userData) =>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports = {jwtMiddleWare,generateToken};