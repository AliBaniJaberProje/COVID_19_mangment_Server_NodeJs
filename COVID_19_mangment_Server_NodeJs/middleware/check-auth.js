const jwt=require('jsonwebtoken');
const secretKey=require('../nodemon.json')

module.exports=(req,res,next)=>{
    try
    {
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,secretKey.env.JWT_KEY);
        req.userData=decoded;
        res.status(401).json({
            massage:'ali'
        })
        next();
    }
    catch (error)
    {
        res.status(401).json({
            massage:'Auth failed from middleware'
        })
    }
}
