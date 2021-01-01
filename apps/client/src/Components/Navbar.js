import React, { useState, useEffect } from "react";

import Modals from "react-modal";

import { Link } from "react-router-dom";

Modals.setAppElement("#root")

const Navbar = () => {
  const [users, setusers] = useState("");

  const [searchusers, setsearchuser]=useState([])

  const [isOpen, setisOpen] = useState(false);

  
  var [navstate, setnavstate] = useState(false);
  var [navclass, setnavcalss] = useState("collapse navbar-collapse");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setusers(user);
    }
  }, []);

  const item1 = [
    {
      id: 2,
      name: "Singin",
      url: "/singin",
    },
    {
      id: 3,
      name: "Singup",
      url: "/singup",
    },
  ];

  const item2 = [
    {
      id: 4,
      name: "Profile",
      url: "/profile",
    },
    {
      id: 5,
      name: "Create post",
      url: "/createpost",
    },
    {
      id: 6,
      name: "Logout",
      url: "/logout",
    },
  ];
  const modalsopen = () => {
    setisOpen(true);
  };
  const modalsclose = () => {
    setisOpen(false);
  };
  const mytoggle = () => {
    if ((navstate = false)) {
      setnavstate(false);
      setnavcalss("collapse navbar-collapse");
    } else {
      {
        setnavstate(true);
        setnavcalss("collapse navbar-collapse show");
      }
    }
    setTimeout(() => {
      setnavstate(false);
      setnavcalss("collapse navbar-collapse");
    }, 3000);
  };

  const searchuser = (query) => {
    const user = localStorage.getItem("user");
    if (user) {
      setusers(user);
    }

    fetch("/api/auth/search-user",{
      method:"post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    }).then(res=>res.json()).then(result=>{
      setsearchuser(result)
    
    }).catch(err=>{
      console.log(err)
    })
    
     
  
  };

  return (
    <>
      {users ? (
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
          <Link to="/" className="text-dark  brand-logo navbar-brand  mr-5">
         <h1 className="display-5">  <i className="fa fa-home" /> Social app</h1>
          </Link>

          <button
            className="navbar-toggler bg-muted"
            type="button"
            onClick={mytoggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={navclass}>
            <ul className="navbar-nav ml-auto">
              {item2.map((item) => {
                return (
                  <li className="nav-item" key={item.id}>
                    <Link className="nav-link text-dark" to={item.url}>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <i className="fa fa-search p-4" onClick={modalsopen}>
              Search
            </i>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
          <Link className="text-dark  brand-logo navbar-brand  mr-5">
            <h1 className="display-5">Social app</h1>
          </Link>

          <button
            className="navbar-toggler bg-muted"
            type="button"
            onClick={mytoggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={navclass}>
            <ul className="navbar-nav ml-auto">
              {item1.map((item) => {
                return (
                  <li className="nav-item" key={item.id}>
                    <Link className="nav-link text-dark" to={item.url}>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      )}

      <Modals isOpen={isOpen} style={{
        overlay:{
          backgroundColor:"gray"
        }
      }}>
        <i
          className="fa fa-close"
          style={{ display: "block" }}
          onClick={modalsclose}
        />




        <div className="card col-md-6 col-sm-12 bg-light border-bottom mr-auto ml-auto">
          <form>
            <input
              className="input bg-muted"
              type="text"
              placeholder="Search Users.........."
              onChange={(e)=> searchuser(e.target.value)}
            />
          </form>
        </div>

        {!searchusers?<h1>No result</h1>:
  searchusers.map(item=>{
    return(
      <>
  <div
          className="card rounded p-2 m-2"
          style={{ width: "14rem", float: "left" }}
        >
          <div className="card-body">
            <img
              className="card-img-top rounded-circle"
              src={item.profile}
            ></img>

            <h5 className="card-title">{item.name}</h5>

            <Link
            to={
              item._id !== users._id
                ? "/users/" + item._id
                : "/profile"
            }
            >
              <button className="btn btn-dark text-muted">Go to Profile</button>
            </Link>
          </div>
        </div>

      
      </>

    )
  })
}
      
      </Modals>
    </>
  );
};
export default Navbar;
