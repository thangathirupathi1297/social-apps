const bcrypt= require('bcryptjs')


const salt = bcrypt.genSalt(10)



const hashGen=async (password)=>{
    try{
        const hassed=await  bcrypt.hash(password,salt)
        return hassed;
    }
    catch(err)
    {
        console.log(err)
    }
}



module.exports.hashGen=hashGen