const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const docSchema=new Schema({

    name:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
      
    },
    email:{
        type:String,
        required:false,
        unique:true,

    },
    fileId:{
        type:String,
        required:true,
        index:true,

    }
});
const DocModel=mongoose.model('DocModel',docSchema);
module.exports=DocModel;