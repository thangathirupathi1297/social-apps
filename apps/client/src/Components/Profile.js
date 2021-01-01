import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const name = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState({});

  const history = useHistory();
  const [image, setImage] = useState();
  const [url, setUrl] = useState();

  const [loading, setloading] = useState(true);

  useEffect(() => {
    userdata();
  }, []);

  const userdata = async () => {
    try {
      setloading(true);
      const response = await fetch(`/api/users/${name._id}`, { method: "GET" });
      const datas = await response.json();

      setData(datas);

      setloading(false);
      console.log(data.users);
      console.log(image);
    } catch (err) {
      console.log(err);
    }
  };

  const postimg = (e) => {
    e.preventdefault();
    const formdata = new FormData();
    formdata.append("file", image);
    formdata.append("upload_preset", "profile");
    formdata.append("cloud_name", "thangathirupathi");
    fetch("https://api.cloudinary.com/v1_1/thangathirupathi/image/upload", {
      method: "post",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        // setUrl(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
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
            <div className="progile-pic  p-4 text-center col-md-6 col-xs-12">
              {data.users.profile ? (
                <>
                  {" "}
                  <img
                    alt=""
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "100px",
                    }}
                    src={data.users.profile}
                  />
                </>
              ) : (
                <>
                  <img
                    alt=""
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "100px",
                    }}
                    src="http://res.cloudinary.com/thangathirupathi/image/upload/v1609473356/vpe3k4ezymugflz0ah3k.png"
                  />
                </>
              )}
              <button
                className="btn btn-primary"
                onClick={() => {
                  history.push("/updateprofile");
                }}
              >
                Add Profile
              </button>
            </div>

            <div className="profile-details p-4  text-center col-md-6 col-xs-12">
              <h4 className="col-xs-12">{data.users.name}</h4>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <h5 className="p-2">{data.post.length} posts</h5>
                <h5 className="p-2">{data.users.followers.length} followers</h5>
                <h5 className="p-2">
                  {" "}
                  {data.users.following.length} following
                </h5>
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

export default Profile;
