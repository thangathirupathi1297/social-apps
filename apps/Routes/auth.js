const express = require("express");
const { UserModel } = require("../Models/Users");

//auth middleware

const auth = require("../Middleware/authmiddleware");

//bcrypt js
const bcrypt = require("bcryptjs");

const router = express.Router();

const { tokengenarator } = require("../Middleware/tokengen");
const { json } = require("express");

router.get("/test", auth, async (req, res) => {
    res.send(req.user);
});

router.get("/", auth, async (req, res) => {
    const user = await UserModel.find().sort({ name: 1 });
    res.send(user);
    console.log("auth get");
});

router.post("/singup", async (req, res) => {
    //destructure
    const { name, email, password, profile } = req.body;

    //check email or enterd or not
    if (!name || !email || !password) {
        return res.status(400).json({ msg:"please check input fields"});
    }
    //find email

    UserModel.findOne({ email: email })
        .then(async (saved) => {
            //if user is already send an error
            if (saved) {
                res.status(422).json({ msg: "user already exists with that email" });

                return;
            }
            const salt = await bcrypt.genSalt(10);
            //hasing password
            const hassed = await bcrypt.hash(password, salt);
            //create new Users
            const newUser = new UserModel({
                name,
                email,
                profile,
                password: hassed,
            });
            const user = await newUser.save();
            res.send(user);
            console.log("user saved:", user);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/singin", async (req, res) => {
    const { email, password } = req.body;

    //check email or enterd or not
    if (!email || !password) {
        return res.status(400).json({ msg: "check email or password" });
    }
    //find saved user using findone

    UserModel.findOne({ email: email })
        .then(async (savedUser) => {
            //if users saved or not  check
            if (!savedUser) {
                res.status(400).json({ msg: "check email or password" });
                console.log("email is wrong");
                return;
            }

            //compare saveduser password and current login password using bycrypt js

            const match = await bcrypt.compare(password, savedUser.password);
            //if password matched send sucessfully login

            if (match) {
                // console.log(savedUser)
                const token = await tokengenarator(savedUser._id);

                //destructure data from saved users
                const { _id, email, name } = savedUser;

                // res.json({"saved users:":savedUser})
                res.json({ token, user: { _id, email, name } });

                // console.log(_id,email,name)
            } else {
                res.status(400).json({ msg: "check email or password" });
                console.log("password did not matched");
                return;
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
});

router.put("/pro", auth, async (req, res) => {
    try {
        const profile = await UserModel.findByIdAndUpdate(
            req.user._id,
            { $set: { profile: req.body.url } },
            { new: true }
        );

        const result = await profile.save();
        res.json(result);
        // console.log(result)
    } catch (er) {
        res.status(404).json({ msg: "Data Not Found:" });

        console.log(er.message);
    }
});
 
router.post("/search-user",async(req,res)=>{

    try
    {

        
        
        let userpatter=new RegExp("^"+req.body.query)
        const user= await   UserModel.find({name:{$regex:userpatter}}).select({_id:1,name:1,email:1,profile:1})
       
        if(user)
        {
            res.json(user)
        }
        else
        {
            res.json({msg:"No users"})
        }


    }catch(err)
    {
        console.log(err)
        res.status(404)
        res.json(err.message)
    }
    
   

})

module.exports = router;
