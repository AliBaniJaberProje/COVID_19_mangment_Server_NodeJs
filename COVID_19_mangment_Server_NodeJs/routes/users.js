var express = require('express');
var router = express.Router();
const User=require('../database/model/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const AddTypeOfUser=require('../middleware/AddTypeOfUser');
var session;


const multer=require('multer');//
const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function (req,file,cb){
        cb(null,new Date().toLocaleString().replace('/','').replace('/','').replace('/','')+file.originalname);
    }
})
const validationImage=require('../middleware/validationImage')
const upload=multer({storage:storage ,
                    limits:{fileSize:1024*1024*5},
                    fileFilter:validationImage.filterImageStorInUplodFile})

/* GET users listing. */

router.get('/', function(req, res, next) {

    User.find({})
        .select(' __id username password imageURL type_user ')
      .then(result=>{

          const allUsers=
          {
              data:result.map(result => {
                  return {
                      _id:result._id,
                      username:result.username,
                      password:result.password,
                      type_user:result.type_user,
                      imageURL :{
                          type_request:'GET',
                          fromServer:'http://localhost:3000/image/'+result.imageURL,
                          from_uploads:'image/'+result.imageURL
                      }

                  }
              })
          }
          console.log(typeof  allUsers.data[0].username)
          res.status(200).json({
              masaage: allUsers
          })
      })
      .catch(error=>{
        res.status(404).json({
          status:404,
          message:'not found'
        })
      });
});
router.post('/insert'
    ,upload.single('UserImage'), AddTypeOfUser,  (req,res,next)=> {
    session=req.session;

    User.find({username:req.body.username})
        .then(result=>{
            if(result.length>=1)
            {
                res.status(501).json({
                    status:501,
                    massage:result+'username must be uniqe',
                })
            }
            else
            {
                bcrypt.hash(req.body.password,10,(error,hash)=>{
                    if(error)
                    {
                        res.status(404).json({
                            status:100,//error in hash
                            massage:err
                        })
                    }
                    else
                    {
                        const userToInSERT=new User({
                            username:req.body.username,
                            password:hash,
                            type_user:session.typeuser,
                            imageURL:new Date().toLocaleString().replace('/','').replace('/','').replace('/','')+req.file.originalname
                        })
                        console.log(userToInSERT);

                        userToInSERT.save()
                            .then(result=>{
                                res.status(200).json({
                                    status:200,
                                    massage:'user inserted success '
                                })

                            })
                            .catch(err=>{
                                res.status(101).json({
                                    status:101,
                                    massage:err
                                })
                            });
                    }
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                status:500,
                massage:'error in find user to uniqe'
            })
        });

})
router.patch('/update/:iduser',(req,res,next)=>{
    User.findById(req.params.iduser)
        .then(result=>
        {
            console.log(req.params.iduser);
            console.log(result);
            if(result) {
                // res.status(200).json(
                // {
                //     massage:'user found'
                // })
                bcrypt.hash(req.body.password, 10)
                    .then(hash=>{
                        const updateddata = ({
                            username: req.body.username,
                            password: hash
                        })
                        User.findOneAndUpdate({_id:req.params.iduser}, {$set: updateddata})
                            .then(result => {
                                res.status(200).json({
                                    status: 200,
                                    massage: 'user updated success '
                                })
                            })
                            .catch(error => {
                                res.status(404).json({
                                    massage: error
                                })
                            })
                    }).catch(err=>{
                        res.status(500).json({
                            status:500,
                            masage:err
                        })
                });
            }
        })
        .catch(error=>{
            res.status(404).json({
                massage:'user not found '
            })
        });
})
router.post('/login',(req,res,next)=> {
    User.find({username:req.body.username})
        .then(user=>{
            if(user.length< 1)//user not found
            {
                res.status(404).json({
                    status:404,
                    massage:'not found user with this username '+req.body.username
                })
            }
            else//user found in db
            {
                bcrypt.compare(req.body.password,user[0].password,(err,valid)=>{
                    if(err)// not same plantext
                    {
                        res.status(404).json({
                            status:404,
                            massage:'Auth Failed '
                        })
                    }
                    if(valid)
                    {
                        const token=jwt.sign({
                            username:user[0].username,
                            userId:user[0]._id,
                            password:user[0].password
                        },'secret',{
                            expiresIn: "1h"
                        });
                        //process.env.JWT_KEY ركز يا علي هون الكي الي بين السيرفر والكلينت الي بشفرو عليها

                        console.log(token);
                        res.status(200).json({
                            status:200,
                            massage:'Auth Successful  '+req.body.username,
                            token:token
                        })
                    }
                })
            }
        })
        .catch(error=>{
            res.status(404).json({
                status:404,
                massage:error+'not found user with this username '+req.body.username
            })
        });
})


module.exports = router;
