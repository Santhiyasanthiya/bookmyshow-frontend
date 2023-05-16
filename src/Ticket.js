import React,{useState} from 'react';
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import axios from "axios";
import { config } from "./config";



function Ticket() {
  const { movie, selected, totalprice } = useParams();
  const [amount, setamount] = useState('');
  let formik = useFormik({
    initialValues:{
      email : ''
    },
    onSubmit:async (values)=>{
     let res = await axios.post(`${config.api}/ticket/:movie/:selected/:totalprice`,values, {
      headers:{
        'Authorization' : `${localStorage.getItem('react_app_token')}`
      }
     })
       alert(res.data.message)
  }
})


const handleSubmit = (e)=>{
  e.preventDefault();

    var options = {
      key: "rzp_test_TBRszxXO09V2D9",
      key_secret:"qWMSR0trZOswucz7ixrXQ4dA",
      amount: totalprice *100,
      currency:"INR",
      name:"STARTUP_PROJECTS",
      description:"for testing purpose",
      handler: function(response){
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name:"Hackathon",          
        email:"hackathonguvi@gmail.com",
        contact:"9047616258"
      },
      notes:{
        address:"Razorpay Corporate office"
      },
      theme: {
        color:"#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();
  
}

  return (
    <>
      <Navbar />
      <div className="container m-2 m-lg-5">
        <form onSubmit={formik.handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
             <h4> Enter mailID to mail the tickets</h4>
            </label>
            <div className="col-lg-4">
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            </div>
          </div>

          <button type="submit" class="btn btn-danger">
            Submit
          </button>
        </form>
        <div  className="row m-1 m-lg-5">
          <div className="row m-1 m-lg-5">
            <div className="card mb-3" style={{ "max-width": "540px" }}>
              <div className="row g-0 " style={{boxShadow:"2px 4px 6px darkred"}}>
                <div className="col mt-5  p-0">
                  <img 
                    src={`data:image/png;base64,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`}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                 
                </div>
                <div className="col-md-8" style={{boxShadow:"2px 4px 6px darkred"}}>
                  <div className="card-body">
                    <h3 className="card-title text-danger">Book My Show</h3>
                    <h5 className="card-title">{movie} </h5>
                    <p className="card-text">{selected}</p>
                    <p className="card-text">
                      <small className="text-muted"><h5>₹{totalprice}</h5></small>
                    </p>

                    <button className='btn btn-danger' value={amount} onChange={(e)=>setamount(e.target.value)} onClick={handleSubmit}>Payment</button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ticket;