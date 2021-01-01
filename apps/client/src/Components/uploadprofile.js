import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

const Upload = () => {
  const [load, setload] = useState(false);
  const [select, setselect] = useState("");
  const [preview, setpreview] = useState("");

  const [alert, setAlert] = useState("");

  const history = useHistory();

  const priview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreview(reader.result);
    };
  };

  const handlesubmit = async (e) => {
    console.log("submited");

    e.preventDefault();

    if (!select) {
      setAlert(
        "please first post the profile then click submit (or) if you already post please wait and submit again "
      );
    } else {
      setload(true);
      uploadpic(select);
      setload(false);
      history.push("/");
    }
  };

  const postimg = (e) => {
    if (!preview) {
      setAlert("please select image");

      setTimeout(() => {
        setAlert("");
      }, 2000);
    }

    const formdata = new FormData();
    formdata.append("file", preview);
    formdata.append("upload_preset", "social");
    formdata.append("cloud_name", "thangathirupathi");
    fetch("https://api.cloudinary.com/v1_1/thangathirupathi/image/upload", {
      method: "post",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        setselect(data.url);
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };

  const uploadpic = async (select) => {
    await fetch("/api/auth/pro", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        url: select,
      }),
    })
      .then((res) => res.json())
      .then((datass) => {
        console.log(datass);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {load ? (
        <>
          <div className="text-center mt-5">
            <div class="spinner-grow text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-danger text-center">{alert}</p>
          <form
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <div className="card col-md-6 col-xs-12 mr-auto ml-auto">
              <input
                type="file"
                className="m-2"
                name="image"
                onChange={(e) => {
                  const file = e.target.files[0];

                  priview(file);
                }}
              ></input>

              <button
                className="btn btn-primary m-2"
                type="button"
                onClick={() => postimg()}
              >
                Posting
              </button>
              <button className="btn btn-danger m-2" type="submit">
                Submit
              </button>
            </div>
          </form>
          {preview ? (
            <div
              className="card col-md-6 col-sm-12 ml-auto mr-auto"
              style={{ height: "456px" }}
            >
              <img
                style={{ height: "100%", width: "100%" }}
                className="col-md-6 col-sm-12"
                src={preview}
              ></img>
            </div>
          ) : (
            <div
              className="card col-md-6 col-sm-12 ml-auto mr-auto"
              style={{ height: "256px" }}
            >
              <h1 className="mt-auto mr-auto ml-auto mb-auto">Preview</h1>
            </div>
          )}{" "}
        </>
      )}
    </>
  );
};

export default Upload;
