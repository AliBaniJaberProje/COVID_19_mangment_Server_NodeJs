var session;
const jwt=require('jsonwebtoken');
const secretKey=require('../nodemon.json')
const userController=require('../controllers/UserController')
const User=require('../database/model/User');
const mongoose =require('mongoose');





module.exports=(req,res,next)=>{
    session=req.session;

    if(req.body.typeuser == null)
   {
       session.typeuser='regualer_user';
       console.log(req.body.typeuser);
       next();
   }
   else
   {
       try
       {
           const token=req.headers.authorization.split(" ")[1];
           const decoded=jwt.verify(token,secretKey.env.JWT_KEY);
           userController.isAdminUser(req,res,next,decoded.userId);



       }
       catch (error)
       {

       }

   }
}
