import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "./config";
import Navbar from "./Navbar";
import UserContext from "./usercontext";

function AdminDashboard() {
  let contextData = useContext(UserContext);
  let [movies, setMovies] = useState([]);
  const [submitEdit, setSubmitEdit] = useState(false)
  const [editMovie, setEditMovie] = useState([])

  let fetchData = async () => {
    try {
      let res = await axios.get(`${config.api}/admin-dashboard`, {
        headers: {
          'Authorization': `${localStorage.getItem('react_app_token')}`
        }
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

  let formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      img: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      if (!submitEdit) {
        try {
          const register = await axios.post(
            `${config.api}/admin-dashboard`,
            values, {
            headers: {
              'Authorization': `${localStorage.getItem('react_app_token')}`
            }
          }
          );
          alert(register.data.message);
          fetchData();
        } catch (error) {
          console.log(error);
        }
      }
      else {
        try {
          delete values._id;
          await axios.put(`${config.api}/admin-dashboard/${editMovie._id}`, values, {
            headers: {
              'Authorization': `${localStorage.getItem('react_app_token')}`
            }
          });
          setSubmitEdit(false)
          fetchData();
        } catch (error) {
          console.log(error)
        }
      }

    },
  });

  const handleEdit = async (id) => {
    try {

      let movie = await axios.put(`${config.api}/admin-dashboard/${id}`);
      console.log(movie.data)
      formik.setValues(movie.data)
      setEditMovie(movie.data)
      setSubmitEdit(true)
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.api}/admin-dashboard/${id}`);
      fetchData();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Navbar data={`${contextData.UserName}`} />
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h2 style={{color:"crimson"}}> Enter Movie details </h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <form onSubmit={formik.handleSubmit}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  <h5>Movie Name</h5>
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                 <h5> Movie Description</h5>
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="text"
                  onChange={formik.handleChange}
                  value={formik.values.text}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  <h5>Image URL</h5>
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="img"
                  onChange={formik.handleChange}
                  value={formik.values.img}
                />
              </div>

              <button type="submit" class="btn btn-danger">
                Submit
              </button>
            </form>
            <div className="row">
              <div className="col mt-4 m-1 p-0">
                <h3 style={{color:"crimson"}}> Movies List</h3>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Image URL</th>
                      <th scope="col"> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.map((movie) => {
                      return (
                        <tr>
                          <td>{movie.title}</td>
                          <td>{movie.text}</td>
                          <td>{movie.img}</td>
                          <td>
                          <Link className="btn btn-sm btn-success"
                              to={`/admin-dashboard/${movie._id}`}>View</Link> 

                            <Link className="btn btn-sm btn-warning"
                              to={`/admin-dashboard/edit/${movie._id}`}>Edit</Link>              
                            <button className="btn btn-danger"
                              onClick={() => handleDelete(movie._id)}>Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;