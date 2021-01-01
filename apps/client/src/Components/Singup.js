import React, { useState } from 'react'

import {Link ,useHistory} from 'react-router-dom'




const Singup =()=>{
    
const history =useHistory()

    const [name,setName]=useState("")

    const [email,setEmail]=useState("")

    const[styles ,setstyle]=useState("none")
    
    const [password,setPassword]=useState("")

    const [alert ,setAlert]=useState("")

    const loadData=(e)=>{
    e.preventDefault();
       
 if(!name||!email||!password)
 {

    setstyle("block")
     setAlert("please check the fields")

     setTimeout(() => {
        setAlert("")
        setstyle("none")
    }, 2000);
     return;
 }
 if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    setstyle("block")
    setAlert("Invalid email")

  setTimeout(() => {
    setAlert("")
    setstyle("none")
}, 2000);
    return
}
        
        fetch("/api/auth/singup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password

            })
        }).then( (res)=>res.json()).then(data=>{
            if(data.msg)
            {
                setstyle("block")
                setAlert(data.msg)

                setTimeout(() => {
                    setAlert("")
                    setstyle("none")
                }, 2000);
                return;
            }
            else{

                // setAlert("User Saved sucessfully")
                history.push('/singin')
            }
        }).catch((err) => {
            console.log(err);
            setstyle("block")
                    setAlert(err.msg)
    
                    setTimeout(() => {
                        setAlert("")
                        setstyle("none")
                    }, 2000);
            return;
          });
    }
  
    return(

       <div className="main-Container container">
              <span  className="text-dark bg-muted text-center " style={{display:styles}}>{alert}<i className="fa fa-question-circle-o" aria-hidden="true"></i> </span>
           
             <div className="card col-md-4 col-xs-12  mr-auto mt-5  ml-auto text-center">
                 <div className="card-header bg-primary">
              
                     <h1 className="card-title brand-logo">Social app</h1>

                 </div>
                 <div className="card-body">
                     <form onSubmit={loadData}>
                      
                     
                         
                    <div className="input-div">
                   
                    <i class="fa fa-user-o" ></i>
                    <input className="input  p-1 m-1" placeholder="Please enter your Name"
                    value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="input-div">
                    <i class="fa fa-google" aria-hidden="true"></i>
                    <input className="input  p-1 m-1" placeholder="Enter your Email"
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="input-div">
                    <i class="fa fa-key"></i>
                    <input className="input  p-1 m-1" placeholder="Enter your password"
                    value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    
                    <button className="btn btn-primary  p-1 m-1 " type="submit">Signup</button>
                    </form>
                    <div className="card-footer">
                    <p className="card-text">have an account?<Link to="/singin">Singin</Link></p>
                    </div>
                  
                 </div>

             </div>
         
       </div>
    )
  
}


export default Singup