import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import UserContext from "./usercontext";
import SeatPicker from "react-seat-picker";
import "./App.css";
import { useNavigate } from "react-router-dom";
function Bookticket() {
  let contextData = useContext(UserContext);
  const [selected, setSelected] = useState([]);
  const [time, setTime] = useState(0);
  let navigate = useNavigate();
  const rows = [
    [
      { number: "A1", isReserved: true },
      { number: "A2" },
      { number: "A3", isReserved: true },
      { number: "A4", isReserved: true },
      { number: "A5" },
      { number: "A6" },
      { number: "A7" },
      { number: "A8" },
      { number: "A9", isReserved: true },
      { number: "A10", isReserved: true },
    ],
    [
      { number: "B1" },
      { number: "B2" },
      { number: "B3", isReserved: true },
      { number: "B4" },
      { number: "B5" },
      { number: "B6", isReserved: true },
      { number: "B7", isReserved: true },
      { number: "B8", isReserved: true },
      { number: "B9", isReserved: true },
      { number: "B10" },
    ],
    [
      { number: "C1" },
      { number: "C2" },
      { number: "C3", isReserved: true },
      { number: "C4" },
      { number: "C5" },
      { number: "C6", isReserved: true },
      { number: "C7" },
      { number: "C8" },
      { number: "C9" },
      { number: "C10" },
    ],
    [
      { number: "D1", isReserved: true },
      { number: "D2" },
      { number: "D3", isReserved: true },
      { number: "D4" },
      { number: "D5" },
      { number: "D6" },
      { number: "D7" },
      { number: "D8" },
      { number: "D9" },
      { number: "D10" },
    ],
    [
      { number: "E1", isReserved: true },
      { number: "E2", isReserved: true },
      { number: "E3", isReserved: true },
      { number: "E4" },
      { number: "E5", isReserved: true },
      { number: "E6" },
      { number: "E7" },
      { number: "E8" },
      { number: "E9" },
      { number: "E10" },
    ],
    [
      { number: "F1" },
      { number: "F2" },
      { number: "F3", isReserved: true },
      { number: "F4" },
      { number: "F5" },
      { number: "F6" },
      { number: "F7" },
      { number: "F8", isReserved: true },
      { number: "F9" },
      { number: "F10" },
    ],
    [
      { number: "G1" },
      { number: "G2" },
      { number: "G3", isReserved: true },
      { number: "G4" },
      { number: "G5" },
      { number: "G6" },
      { number: "G7" },
      { number: "G8", isReserved: true },
      { number: "G9", isReserved: true },
      { number: "G10" },
    ],
    [
      { number: "H1" },
      { number: "H2" },
      { number: "H3", isReserved: true },
      { number: "H4" },
      { number: "H5" },
      { number: "H6" },
      { number: "H7", isReserved: true },
      { number: "H8", isReserved: true },
      { number: "H9", isReserved: true },
      { number: "H10" },
    ],
    [
      { number: "I1" },
      { number: "I2" },
      { number: "I3", isReserved: true },
      { number: "I4" },
      { number: "I5" },
      { number: "I6", isReserved: true },
      { number: "I7" },
      { number: "I8" },
      { number: "I9" },
      { number: "I10" },
    ],
    [
      { number: "J1" },
      { number: "J2" },
      { number: "J3" },
      { number: "J4" },
      { number: "J5" },
      { number: "J6" },
      { number: "J7", isReserved: true },
      { number: "J8" },
      { number: "J9" },
      { number: "J10" },
    ],
  ];
let count = contextData.count
  const price = 150;
  const totalprice = price * selected.length;
  const removeSeatCallback = ({ row, number, id }) => {
    console.log("remove seat...");
    setSelected((list) => list.filter((item) => item !== number));
  };
  const addSeatCallback = ({ row, number, id }) => {
    console.log("add seat...");
    setSelected((prevItems) => [...prevItems, number]);
    selected.map((select) => {
      if (select === number) { 
        console.log("remove");
        const index = selected.indexOf(number);
        console.log(index);
        if (index > -1) {
          selected.splice(index, 1);
        }
      }
    });
  };
  console.log(selected);

  const movie = contextData.title;
  return (
    <>
      <Navbar data={`${contextData.UserName}`} />
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <h3>{`Movie: ${contextData.title}`}</h3>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <SeatPicker 
            removeSeatCallback={removeSeatCallback}
            addSeatCallback={addSeatCallback}
            rows={rows}
            alpha
            maxReservableSeats={count}
            visible
          />
          {selected.length !== 0 ? (
            <>
              <div className=" mt-5 m-0 p-2 seat-price">
                <div className="seat-select">
                  <h1 className="seats-select">SEAT:{selected.toString()}</h1>
                </div>
             
                <div className="totalprice">
                  <h1 className="price">
                    price:{"₹"}
                    {totalprice}
                  </h1>
                </div>

              </div>
             
              <div className="row justify-content-center">
                <div className="col-lg-3 m-5 col align-self-center">
                  <button style={{border:"4px solid darkred"}}
                    className="btn btn-warning"
                    onClick={() =>
                      navigate(`/ticket/${movie}/${selected}/${totalprice}`)
                    }
                  >
                    CheckOut
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Bookticket;