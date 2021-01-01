import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const Home = () => {
  const [postss, setpost] = useState([]);

  const [text, settext] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("/api/posts/", {
      method: "get",
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(typeof(result))
        setpost(result);
        //  console.log(result)

        // window.location.reload(false)
        //console.log(postss)
      });
  }, []);

  const likePost = (id) => {
    fetch("/api/posts/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postid: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newpost = postss.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        console.log(user._id);
        setpost(newpost);
      })
      .catch((err) => console.log(err));
  };

  const unlikePost = (id) => {
    fetch("/api/posts/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postid: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newpost = postss.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        console.log(user._id);
        setpost(newpost);
      })
      .catch((err) => console.log(err));
  };

  const comment = (text, postid) => {
if(!text)
{
  return
}

    fetch("/api/posts/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postid,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newpost = postss.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setpost(newpost);
        settext("");
      })
      .catch((err) => console.log(err));
  };

  const deletepost = (postid) => {
    fetch("/api/posts/deletepost", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postid,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newpost = postss.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });

        setpost(newpost);
        settext("");
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {postss.map((item) => {
        return (
          <div className="card container col-md-6 p-3 col-xs-12" key={item._id}>
            {
              <div className="card-header">
                <Link
                  to={
                    item.postedBy._id !== user._id
                      ? "/users/" + item.postedBy._id
                      : "/profile"
                  }
                >
                  {" "}
                  <h6>{item.postedBy.name}</h6>
                </Link>
                {item.postedBy._id == user._id ? (
                  <i
                    onClick={() => {
                      deletepost(item._id);
                    }}
                    className="fa fa-trash"
                    style={{ float: "right" }}
                  ></i>
                ) : (
                  <i></i>
                )}
              </div>
            }

            <img className="card-img-top" alt="" src={item.photo} />

            <div className="card-body">
              <div>
                <span>
                  {item.like.includes(user._id) ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => unlikePost(item._id)}
                    >
                      <i className="fa fa-heart-o"></i>
                    </button>
                  ) : (
                    <button
                      className="btn btn-muted"
                      onClick={() => likePost(item._id)}
                    >
                      <i className="fa fa-heart-o"></i>
                    </button>
                  )}
                </span>
              </div>
              <h6>{item.like.length} Likes</h6>
              <h5 className="card-title">{item.postedBy.name}</h5>
              <h6>{item.title}</h6>
              <span style={{ display: "block" }}>{item.body}</span>

              {item.comments.map((commentbox) => {
                return (
                  <span key={commentbox._id} style={{ fontSize: "16px" }}>
                    <h6 className="text-danger">{commentbox.postedBy.name}</h6>{" "}
                    <p>{commentbox.text}</p>
                  </span>
                );
              })}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  comment(text, item._id);
                }}
              >
                <div className="input-group mb-3">
                  <input
                    className="input card-text form-control"
                    type="text"
                 
                    placeholder="add a comments"
                    onChange={(e) => {
                      settext(e.target.value);
                    }}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-muted">
                      <i className="fa fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Home;
