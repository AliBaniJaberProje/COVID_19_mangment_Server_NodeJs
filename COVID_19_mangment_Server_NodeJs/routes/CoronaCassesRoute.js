const express = require('express');
const router = express.Router();
const checkAuth=require('../middleware/check-auth');
const CoronaModel=require('../database/model/CoronaCasses')
const productControlar=require('../controllers/CoronaCassesController');

router.post('/add',(req,res,next)=>{
    var d = Date(Date.now());
    a = d.toString();
    const data=new CoronaModel({
        city:req.body.city,
        numberofcasess:req.body.numberofcasess,
        updat_date:a,
        date_created:a
    });
    data.save().then(result=>{
        res.status(200).json({
            status:200,
            massage:result
        })
    }).catch(err=>{
        res.status(404).json({
            status:404,
            massage:err
        })
    });




    console.log(d);
})

module.exports = router;
