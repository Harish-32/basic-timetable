const express = require("express");
const mongoose = require("mongoose");
const path=require('path')
const port=3019
const app=express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://127.0.0.1:27017/summer_timetable')
const db=mongoose.connection
db.once('open',()=>{
    console.log("mongodb connect successful")
})
/*const userSchema=new mongoose.Schema({
    regd_id:String, 
    branch:String,
    Work:String
    //branch:String
})*/
const userSchema = new mongoose.Schema({
    //regd_id: String,
    date:String,
    day: String,
    Work: String
   // date: { type: Date, default: Date.now } // Automatically stores the current date and time
});
const Users=mongoose.model("data",userSchema)
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"timetable.html"))
})   
app.post('/post',async(req,res)=> {
    console.log(req.body);
    const{date,day,Work}=req.body;
    const user=new Users({
        //regd_id,
        date,
        day,
        Work
    });
    await user.save()
    console.log(user)
    res.send("form submission succesful")
    });
app.listen(port,()=>{
    console.log("server started")
})