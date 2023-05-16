import React from 'react';
import "./App.css";
import { useContext, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { config } from "./config";
import Navbar from "./Navbar";
import UserContext from "./usercontext";

function View() {
  let contextData = useContext(UserContext);
  const params = useParams();
  console.log(params);

  const [searchParams, setSearchParams] = useSearchParams()
  console.log(...searchParams);

  const [userData, setUserData] = useState({})

  useEffect(() => {
    loadUser();
  }, [])

  let loadUser = async () => {
    try {
      let user = await axios.get(`${config.api}/admin-dashboard/${params.id}`, {
        headers: {                                                           // Changes Here
          "Authorization": window.localStorage.getItem("react_app_token")
        }
      });
      setUserData(user.data)
    } catch (error) {

    }
  }

  return (
    <>
      <Navbar data={`${contextData.UserName}`} />
      <div className="grow">
      <div className="hover14 column">
        <div className='center'>
          <figure><img src={userData.img} /></figure>
          <h2 className='view' style={{color:'darkred'}}>{userData.title}</h2>
          <h3 className='view' style={{color:'gray'}}>{userData.text}</h3>
        </div>

        </div>
      </div>
    </>
  )
}

export default View;