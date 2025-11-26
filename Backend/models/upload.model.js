const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const uploadSchema=new Schema({
    count:{
        type:Number,
        default:0,
    }
})
const uploadModel=mongoose.model('uploadModel',uploadSchema);
module.exports=uploadModel;