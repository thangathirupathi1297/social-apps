import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";


const Signin = () => {
  // const { state, dispatch } = useContext(userContext);

  const history = useHistory();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const[styles ,setstyle]=useState("none")
    

  const [alert, setAlert] = useState("");

  const postSignin = (e) => {
    e.preventDefault();
    if(!email||!password)
 {

    setstyle("block")
     setAlert("please check the fields")

     setTimeout(() => {
        setAlert("")
        setstyle("none")
    }, 2000);
     return;
 }

    fetch("/api/auth/singin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.msg) {
          setstyle("block")
          setAlert(data.msg);

          setTimeout(() => {
            setAlert("");
            setstyle("none")
          }, 2000);
          return;
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          history.push("/");
          window.location.reload(false)
          
        return  
        }
      })
      .catch((err) => {
        console.log(err);
        setstyle("block")
                setAlert(err.msg)

                setTimeout(() => {
                    setAlert("")
                    setstyle("none")
                }, 2000);
        return;
      });
  };
  return (
    <div className="main-Container container">
        <span  className="text-dark bg-muted text-center " style={{display:styles}}>{alert}<i className="fa fa-question-circle-o" ></i> </span>
           
      <div className="card col-md-4 col-xs-12 mt-5 mr-auto  ml-auto text-center">
        <div className="card-header bg-primary">
          
          <h1 className="card-title  brand-logo">Social app</h1>
        </div>
        <div className="card-body">
          <form onSubmit={postSignin}>
            <div className="input-div">
              <i class="fa fa-user-o"></i>
              <input
                className="input  p-1 m-1"
                type="text"
                placeholder="enter your email address.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-div">
              <i class="fa fa-key"></i>
              <input
                className="input  p-1 m-1"
                type="text"
                placeholder="enter your password.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-primary  p-1 m-1 " type="submit">
              Signin
            </button>
          </form>
          <div className="card-footer">
            <p className="card-text">
              don't have an account?<Link to="/singup">Singup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
