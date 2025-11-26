
const multer = require("multer");
const joi=require("joi");
const DocModel=require("../models/doc.model.js");
const docValidation=(req,res,next)=>{
    const Schema=joi.object({
        file:joi.object().required(),
       
    });
    if(!req.file){
        return res.status(400).json({message:"file is required"});
    }
    const allowedTypes=["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel"
];
if(!allowedTypes.includes(req.file.mimetype)){
    return res.status(400).json({message:"only excel files area allowed"});
}
next();
   
    

    

};



module.exports = docValidation;
