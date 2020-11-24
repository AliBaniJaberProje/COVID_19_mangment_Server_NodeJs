const mongoos=require('mongoose');


const ProductSchema=mongoos.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required: true
    }
})


module.exports=mongoos.model('Product',ProductSchema);
