const { tokenValidator }=require('./tokengen')



const {UserModel} = require('../Models/Users')


module.exports= async function(req,res,next)
{
   try
   {
    const token= req.header("x-auth-token")



    const valid= await tokenValidator(token)

    // console.log(valid)

    if(valid) 
    {

        let user= await UserModel.findById(valid.id)
        // console.log(user)
        req.user=user
        next()
        return;
    }
   
   }
   catch(err)
   {
       console.log(err.message)
       res.status(401).json({msg:"invalid token"})
   }
    
}
