const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/eval");
};

const userSchema = new mongoose.Schema({
    company_name :{type: String, required:true},
    jobs : {type:String, required:true},
    skillset : {type:String, required:true},
    vacancies : {type:Number, required:true},
    notice_period : {type:Boolean, required:false},
});

const User = mongoose.model("user", userSchema);

const postSchema = new mongoose.Schema({
    companyName :{type: String, required:true},
    jobs_title : {type:String, required:true},
    required_skill : {type:String, required:true},
    tags:[
        { type : mongoose.Schema.Types.ObjectId, ref:"tag", required:true}
    ],
},{
    versionKey: false, timestamps:true
});

const Post = mongoose.model("post",postSchema);

const commentSchema = mongoose.Schema({
    company:{type:String, required: true},
    post: {type:mongoose.Schema.Types.ObjectId, ref:"post",required:true},
});

const Comment = mongoose.model("comment",commentSchema);

const tagSchema = mongoose.Schema({
    companyName : { type:String, required:true},
});

const Tag = mongoose.model("tag",tagSchema);

app.post("/users",async(req,res)=>{
    const User=await User.create(req.body);
    return res.status(201).send({post});
});

app.get("/users",async(req,res)=>{
    const user = await User.find().lean().exec();
    return res.status(200).send({user});
});

app.delete("/users/:id",async (req,res)=>{
    const user = await User.findByIdAndUpdate(req.params.id).lean().exec();
    return res.status(200).send({user});
});

app.get("/users/:id/posts",async(req,res)=>{
    const posts = await Post.find({required_skill: req.params.id}).lean().exec();
    const required_skill = await
    User.findById(req.params.id).learn().exec();
    return res.status(200).send({posts, required_skill});
})

app.post("/users",async(req,res)=>{
    const post = await Post.create(req.body);
    return res.status(201).send({post});
});

app.get("posts",async(req,res)=>{
    const post = await Post.find().lean().exec();
    return res.status(200).send({post});
})




app.listen(4567,async()=>{
    //console.log("listening on port 4567");
    await connect();
    console.log("listening on port 4567");
})