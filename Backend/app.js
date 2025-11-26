const cors=require("cors");
const docRoutes=require("./routes/doc.route.js");
require("dotenv").config();
const express=require("express");
const connectDB = require("./configuration/db.js");
connectDB();
const app=express();
const port=process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));

app.get("/ping",(req,res)=>{
    res.send("hii");
})
app.use("/doc",docRoutes);
app.listen(port,()=>{
    console.log("server is running ");
});
