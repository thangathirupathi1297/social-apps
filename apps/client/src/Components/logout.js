import React from "react"



import { Link,useHistory } from "react-router-dom";


const Logout=()=>{

    const history=useHistory()


    const singout =()=>{
         
        localStorage.clear()

        history.push("/signin")
        window.location.reload(false)
    }


    return(
        <>
              
              <div className="card col-md-4 col-xs-12 mt-5 mr-auto  ml-auto text-center">

                  <div className="card-body">
                      <div className="card-header   ">are you sure you want to logout?</div>
                      <button className="btn btn-light  mt-2" onClick={singout} >Yes</button><button className="btn btn-primary  mt-2"><Link to="/" className="text-dark" style={{textDecoration:"none"}}>No</Link> </button>
                  </div>
              </div>

        </>
    )

}


export default Logout