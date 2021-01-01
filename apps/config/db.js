const mongoose=require('mongoose')
//config framework

const config=require('config')

//dburl

const dbURI=config.get('mongoURI')

const db =async()=>
{
    try{
      await  mongoose.connect(dbURI,{
           useNewUrlParser: true ,
            useUnifiedTopology: true,
            useCreateIndex: true ,
            useFindAndModify:false
    
        })
        console.log("Database is  Connected")

    }
    catch(err)
    {
        (err)=>console.log(err.message)
    }
        
} 



module.exports=db