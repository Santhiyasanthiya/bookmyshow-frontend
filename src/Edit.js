import React from 'react'
import { useFormik } from 'formik';
import {useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { config } from './config';
import Navbar from "./Navbar";
import UserContext from "./usercontext";


function Edit() {
  let contextData = useContext(UserContext);
    const params = useParams()
  
    const navigate = useNavigate()
  
    const formik = useFormik({
      initialValues: {
        title: "",
        text: "",
        img: ""
      },
      validate: (values) => {
        let errors = {};
  
        if (values.title === "") {
          errors.title = "Please enter title";
        }
  
  
        if (values.text === "") {
          errors.text = "Please enter text";
        }
  
        if (values.img === "") {
          errors.img = "Please enter image";
        }
  
        return errors;
  
      },
      onSubmit: async (values) => {
        await axios.put(`${config.api}/admin-dashboard/${params.id}`, values, {
          headers: {                                                              // Changes Here
            "authorization": window.localStorage.getItem("react_app_token")
          }
        })
        navigate("/admin-dashboard")
      }
    });
  
    useEffect(() => {
      loadUser()
    }, [])
  
    let loadUser = async () => {
      try {
        let user = await axios.get(`${config.api}/admin-dashboard/${params.id}`, {
          headers: {                                                          // Changes Here
            "Authorization": window.localStorage.getItem("react_app_token")
          }
        });
        formik.setValues({
          title: user.data.title,
          text: user.data.text,
          img: user.data.img
  
        })
      } catch (error) {
  
      }
  
    }
  
    return (
      <>
       <Navbar data={`${contextData.UserName}`} />
        <div className='container'>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
  
              <div className="col-lg-9 mt-4">
                <label><h4>Movie Name</h4></label>
                <input className='form-control' type={"text"} value={formik.values.title} onChange={formik.handleChange} name="title" ></input>
                <span style={{ color: "red" }}>{formik.errors.title}</span>
              </div>
  
              <div className="col-lg-9 mt-4">
                <label><h4 >Description</h4> </label>
                <input className={`form-control ${formik.errors.text ? `input-error` : ``}`} type={"text"} value={formik.values.text} onChange={formik.handleChange} name="text"></input>
                <span style={{ color: "red" }}>{formik.errors.text}</span>
              </div>
  
              <div className="col-lg-9 mt-4">
                <label><h4>Image url</h4></label>
                <input className='form-control' type={"text"} value={formik.values.img} onChange={formik.handleChange} name="img"></input>
              </div>
              <div className="col-lg-9 mt-4">
              <input className='btn btn-danger' type={"submit"} value="Submit" disabled={!formik.isValid}></input>
            </div>
            </div>
          </form>
        </div>
      </>
    );
  }
  
  export default Edit;