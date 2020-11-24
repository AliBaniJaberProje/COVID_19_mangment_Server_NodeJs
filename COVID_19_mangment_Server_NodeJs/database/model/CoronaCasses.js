const mongoose=require('mongoose');


const CoronaCasses=mongoose.Schema({
    city:{
        type:String,
        required:true
    },
    date_created:{
        type:String,
        required: true
    },
    updat_date:{
        type:String,
        required:true
    },
    numberofcasess:{
        type:Number,
        required:true,
    }



})
module.exports=mongoose.model('Corona',CoronaCasses);
