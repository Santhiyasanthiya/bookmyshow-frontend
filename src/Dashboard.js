import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "./config";
import Navbar from "./Navbar";
import UserContext from "./usercontext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  let navigate = useNavigate()
  let [movies, setMovies] = useState([]);
  let contextData = useContext(UserContext);
  let formik = useFormik({
    initialValues: {
      count: 0
    },
    onSubmit: (values) => {
      console.log(values)
      contextData.setCount(values.count)
    }
  })
  let fetchData = async () => {
    try {
      let res = await axios.get(`${config.api}/dashboard`, {
        headers: {
          Authorization: `${localStorage.getItem("react_app_token")}`,
        },
      });
      setMovies(res.data);

      console.log(movies);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);



  let sendTitle = function (title) {
    contextData.setTitle(title);
    if (contextData.count !== 0) {
      navigate('/bookticket')
    } else {
      alert('Enter Ticket Count')
    }
  };
  return (
    <>
      <Navbar data={`${contextData.UserName}`} />
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-danger text-center"> Movie List </h1>
          </div>
          <form className="d-flex flex-nowrap" onSubmit={formik.handleSubmit}>
            <div className="mb-3 col-lg-2">
              <label for="ticket-count" className="form-label"> 
               <h4> Enter Ticket count</h4>
              </label>
              <input style={{border:"3px solid green"}}
                type="number"
                className="form-control"
                name="count"
                value={formik.values.count}
                onChange={formik.handleChange}
                id="ticket-count"
              />
            </div>

            <button type="submit" className="btn btn-danger m-4 p-2 ">
              Submit
            </button>
          </form>
          <div className="row m-5">

            {movies.map((movie) => {
              return (  
                <div className="col">
                  <div className="hover14 row">
                  <div class="card" style={{ width: "18rem", height:"30%" }}>
                    <figure> 
                       <img style={{ marginTop: "-80px",height:"400px" }}
                   src={`${movie.img}`}
                      class="card-img-top img-thumbnail"
                      alt="..."
                    />
                    </figure>
                    <div class="card-body">
                      <h3 class="card-title" style={{color:"darkred"}}>{movie.title}</h3>
                      <h6 class="card-text" style={{color:"gray"}}>{movie.text}</h6>
                      <button
                        // to="/bookticket"
                        onClick={() => sendTitle(`${movie.title}`)}
                        class="btn btn-danger"
                      >
                        Book Tickets
                      </button>
                    </div>
                  </div>
                </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;