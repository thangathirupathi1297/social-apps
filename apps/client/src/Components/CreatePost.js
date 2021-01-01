import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState();
  const [url, setUrl] = useState();
  const [alert, setAlert] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (url) {
      fetch("/api/posts/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          photo: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.msg) {
            setAlert(data.msg);

            setTimeout(() => {
              setAlert("");
            }, 2000);
            return;
          } else {
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  }, [url]);

  //posting a image in cloudinary
  //first create cloudinary account 2. go to settings choose upload 3. in down site select add upload preset
  const postimg = () => {
    const formdata = new FormData();
    formdata.append("file", image);
    formdata.append("upload_preset", "social");
    formdata.append("cloud_name", "thangathirupathi");
    fetch("https://api.cloudinary.com/v1_1/thangathirupathi/image/upload", {
      method: "post",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card col-md-6 col-xs-12 mr-auto ml-auto">
      <span className="text-danger bg-muted text-center">{alert}</span>
      <form>
        <div className="card-title col-md-12 p-3  input-div">
          <input
            type="text"
            placeholder="Title"
            className="input"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="card-body col-md-12  p-3 input-div">
          <input
            type="text"
            placeholder="Body"
            className="input"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </div>

        <div className="input-div">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <button
          className="btn btn-primary"
          onClick={postimg}
          style={{ display: "block" }}
          type="button"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
