const mongoose=require('mongoose');

const Users=mongoose.Schema({
    username:{
        type:String,
        required:true,
        // unique:true,
        match: /a/
    },
    password:{
        type:String,
        required: true
    },
    imageURL:{
        type :String,
        required:true

    },
    type_user:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('User',Users);
