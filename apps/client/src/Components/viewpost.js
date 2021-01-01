import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios"

const Viewpost = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    userdata();
  }, []);

  const userdata =async  () => 
  {
 
    setloading(true);
   fetch(`/api/posts/viewpost/${id}`,{
   
      }).then(res=>res.json()).then(result=>{
        if(result)
        {
         
           setData(result);
   
        }

      }).catch(err=>{console.log(err)})

     

    
      
      setloading(false);
  };


    // fetch("/api/posts/viewpost", 
    // {
    //   method: "GET",
    //   body: JSON.stringify({
    //     postid: id,
    //   }),
    // })
      

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div class="spinner-grow text-secondary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else
    return (
      <>
      <h1></h1>
        {data.map((item) => {
          return (
            <div
              className="card container col-md-6 p-3 col-xs-12"
              key={item._id}
            >
              <div className="card-header">
                
                <h3 className="text-danger">{item.postedBy.name}</h3>

                <img className="card-img-top" alt="" src={item.photo} />

                <i style={{fontSize:"25px"}} className="fa fa-comments">{item.comments.length}</i>
                <i style={{fontSize:"25px"}} className="fa fa-heart">{item.like.length}</i>
       
                
              </div>
            </div>
          );
        })}
      </>
    );
};

export default Viewpost;
