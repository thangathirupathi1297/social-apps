import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";


const UserProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const userid = JSON.parse(localStorage.getItem("user"));

  const [loading, setloading] = useState(true);

  const [follows, setfollows] = useState();

  useEffect(() => {
    userdata();
  }, []);

  const userdata = async () => {
    setloading(true);
    const response = await fetch(`/api/users/${id}`, { method: "GET" });
    const datas = await response.json();

    setData(datas);

    setloading(false);
  };

  const follow = () => {
    fetch("/api/users/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followid: id,
      }),
    })
      .then((res) => res.json())
      .then((datass) => {
        window.location.reload(false);
        ///setData(datass)
        console.log(datass);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unfollow = () => {
    fetch("/api/users/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followid: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div class="spinner-grow text-secondary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="profile-info row">
            <div className="profile-pic  p-4 text-center col-md-6 col-xs-12">
              {data.users.profile ? (
                <img
                  alt=""
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "100px",
                  }}
                  src={data.users.profile}
                />
              ) : (
                <img
                  alt=""
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "100px 2pxsolid",
                    borderColor:"gray"
                    
                  }}
                  src="http://res.cloudinary.com/thangathirupathi/image/upload/v1609473356/vpe3k4ezymugflz0ah3k.png"
                />
              )}
            </div>

            <div className="profile-details p-4  text-center col-md-6 col-xs-12">
              <h4 className="col-xs-12">{data.users.name}</h4>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <h5 className="p-2">{data.post.length} posts</h5>
                <h5 className="p-2">{data.users.followers.length} followers</h5>
                <h5 className="p-2">{data.users.following.length} following</h5>

                {data.users.followers.includes(userid._id) ? (
                  <button className="btn btn-danger" onClick={() => unfollow()}>
                    unfollow
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={() => follow()}>
                    follow
                  </button>
                )}
              </div>
            </div>
          </div>

            {data.post.map((item) => {
              return (
                <div className="card col-md-3 borfer border-dark col-sm-12 " style={{float:"left",height:"256px"}}>
                <div className="card-img-top"  >
              <Link key={item._id} to={"/post/" + item.postedBy._id}>
               
                <img className="col-12" alt="gallary" src={item.photo} />
             
              </Link>
              </div>
              </div>
              );
            })}
         
        </div>
      </>
    );
  }
};

export default UserProfile;
