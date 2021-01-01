const express= require("express")



const mongodb=require('./config/db')

mongodb()

const posts =require("./Routes/post")

const auth =require("./Routes/auth")

const user = require("./Routes/user")

const path=require('path')

const app=express()
 

app.use(express.json())

app.use("/api/posts", posts)

app.use("/api/auth", auth)


app.use("/api/users",user)


if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
  }


const PORT=process.env.PORT || 4000
app.listen(PORT,()=>{console.log(`port connected on ${PORT}`)})
