const express = require("express");
const PostModel = require("../Models/Post");

const auth = require("../Middleware/authmiddleware");
const { findOneAndUpdate } = require("../Models/Post");

const router = express.Router();

// get all others post
router.get("/", async (req, res) => {
  try {
    const post = await PostModel.find().sort({createdAt:1}).populate({
      path: "postedBy",
      select: "name",
    }).populate({path:"comments.postedBy",select:"name"})

    // console.log(post)

    res.json(post);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }

  //    PostModel.find().populate({path:"postedBy",password:"password"}).then((postasved)=>{
  //        res.send(postasved)

  //    }).catch((err)=>console.log(err))
});
//get my own posts
router.get("/myposts", async (req, res) => {
  try {
    const mypost = await PostModel.find({ postedBy: req.user._id }).populate({
      path: "postedBy",
      select: "name",
    })

    //console.log("posts:",mypost)
    res.json(mypost);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});


router.get("/viewpost/:id", async (req, res) => {
  try {
    const mypost = await PostModel.find({postedBy:req.params.id}).populate({
      path: "postedBy",
      select: "name",
    })

    //console.log("posts:",mypost)
    res.json(mypost);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);

  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, body, photo, like } = req.body;

    if (!title || !body || !photo)
      return res.status(402).send("please fill title and body");

    const post = new PostModel({
      title,
      body,
      photo,
      like,
      postedBy: req.user,
    });
    const newpost = await post.save();

    console.log(newpost);

    res.json({ post: newpost });
  } catch (er) {
    console.log(er);
  }

  router.delete("/deletepost", async (req, res) => {
    try {
      const result = await PostModel.findOneAndRemove(req.body.postid);

      if (result) {
        res.json(result);
      } else {
        res.send("id not found");
      }
    } catch (err) {
      res.send(err.message);
    }
  });
  

  router.put('/',auth,async(req,res)=>{
    //find the genres for update

   try{
    //valitaition 
   // findbyIdAndUpdate
  
    const likes= await PostModel.findByIdAndUpdate(req.body.postid,{$push:{like:req.user._id}},{
        new:true,
    }).populate({
      path: "postedBy",
      select: "name",
    });
    
    const result= await likes.save()
    res.send(result)
    console.log(result)
   } 
   catch(er)
   {
  res.status(404).send("Data Not Found:")

  console.log(er.message)
     
   }})
   router.put('/unlike',auth,async(req,res)=>{
    //find the genres for update

   try{
    //valitaition 
   // findbyIdAndUpdate
  
    const likes= await PostModel.findByIdAndUpdate(req.body.postid,{$pull:{like:req.user._id}},{
        new:true,
    }).populate({
      path: "postedBy",
      select: "name",
    });
    
    const result= await likes.save()
    res.send(result)
    console.log(result)
   } 
   catch(er)
   {
  res.status(404).send("Data Not Found:")

  console.log(er.message)
     
   }})
   
    router.put('/comment',auth,async(req,res)=>{
    //find the genres for update

   try{
    const comment={
     text:req.body.text,
     postedBy:req.user._id
  }
   // findbyIdAndUpdate
  
    const comments= await PostModel.findByIdAndUpdate(req.body.postid,{$push:{comments:comment}},{
        new:true,
    }).populate({
      path: "postedBy",
      select: "name",
    }).populate({path:"comments.postedBy",select:"name"});
    
    const result= await comments.save()
    res.send(result)
    console.log(result)
   } 
   catch(er)
   {
  res.status(404).send("Data Not Found:")

  console.log(er.message)
     
   }})
   




});

module.exports = router;
