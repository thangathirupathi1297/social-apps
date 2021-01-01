const mongoose = require("mongoose");
const  UserModel = require('../Models/Users')

const {userSchema}=require('./Users')

const {ObjectId}=mongoose.Schema.Types




const postSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        body:{
            type:String,
            required:true
        },
        photo:{
            type:String,
            required:true,
        },
        like:[
            {
                type:ObjectId,
                ref:"Users"
            }
        ],
        comments:[{
            text:String,
            postedBy:{type:ObjectId,ref:"Users"}
        }],
        postedBy:{
            type:ObjectId,
            ref:"Users"
          
        }
    },{timestamps:true}
)

module.exports=mongoose.model("Post",postSchema)