import React, { useEffect, useState } from "react";
import homeimg from "./../../assets/svg/Home-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const GuestRoomBook = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const [newRoom, setNewRoom] = useState({
    RoomNo: "",
    RollNo: "",
    Name: "",
    Gender: "",
    Relationship: "",
    NumberOfPersons: "",
    PermanentAddress: "",
    ContactAddress: "",
    PhoneNo: "",
    EmailId: "",
    CheckIn: "",
    CheckOut: "",
  });

  const handleChange = (e) => {
    setNewRoom((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/user/guestroombook", newRoom);
      console.log(newRoom);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="md:w-[85vw] w-[100%] sticky left-[20vw] bg-gray-800 text-white lg:p-8 p-1">
        {/* <center> */}
        <div
          style={{
            // width: "90%",
            // textAlign: "left",
            // fontSize: "x-large",
            // color: "white",
            padding: "0px 77px",
          }}
        >
          <div className="path p-2 flex items-center text-xl header">
            <img src={homeimg} alt="home" />
            <p className="pl-4 text-3xl">
              <Link to="/"> Home </Link>/ Guest Room Booking
            </p>
          </div>
        </div>
        {/* </center> */}
        <br />
        <div className="flex justify-center">
          <div
            className="w-[90%] bg-slate-100"
            style={{ borderRadius: "10px" }}
          >
            <div className="flex items-center p-3 text-black">
              &nbsp;&nbsp;
              <FontAwesomeIcon icon={faPen} />
              &nbsp;&nbsp;
              <div className="text-2xl">Room Booking Details</div>
            </div>
            <div
              style={{
                backgroundColor: "rgb(85, 88, 98)",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              <form
                onSubmit={handleSubmit}
                className="px-6 py-4"
                style={{ fontSize: "x-large" }}
              >
               
                <div className="grid grid-cols-2 gap-6">
                <div className=" flex ">
                    <label
                      htmlFor="RollNo"
                      className="w-[25%]"
                      style={{ minWidth: "114px" }}
                    >
                      Roll No.:
                    </label>
                    <input
                      type="text"
                      name="RollNo"
                      id="RollNo"
                      style={{ borderRadius: "10px", width: "70%" }}
                      className="text-black p-1"
                      onChange={handleChange}
                    />
                  </div>
                  <div className=" flex ">
                    <label
                      htmlFor="RoomNo"
                      className="w-[25%]"
                      style={{ minWidth: "114px" }}
                    >
                      Room No.:
                    </label>
                    <input
                      type="text"
                      name="RoomNo"
                      id="RoomNo"
                      style={{ borderRadius: "10px", width: "70%" }}
                      className="text-black p-1"
                      onChange={handleChange}
                    />
                  </div>
                  <div className=" flex ">
                    <label
                      htmlFor="firstName"
                      className="w-[25%]"
                      style={{ minWidth: "114px" }}
                    >
                      Guardian Name:{" "}
                    </label>
                    <input
                      type="text"
                      name="Name"
                      style={{ borderRadius: "10px", width: "70%" }}
                      className="text-black p-1"
                      onChange={handleChange}
                    />
                  </div>
                  <div className=" flex ">
                    <label
                      htmlFor="Gender"
                      className="w-[25%]"
                      style={{ minWidth: "114px" }}
                    >
                      Gender:
                    </label>
                    <select
                      name="Gender"
                      id="Gender"
                      style={{
                        borderRadius: "10px",
                        color: "black",
                        width: "70%",
                      }}
                      onChange={handleChange}
                    >
                      <option value="none">
                        Select your gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="transgender">Transgender</option>
                      <option value="pnts">Prefer not to say</option>
                    </select>
                  </div>
                  <div className=" flex ">
                    <label
                      htmlFor="Relationship"
                      className="w-[25%]"
                      style={{ minWidth: "114px" }}
                    >
                      Relationship:
                    </label>
                    <input
                      type="text"
                      name="Relationship"
                      style={{ borderRadius: "10px", width: "70%" }}
                      className="text-black p-1"
                      onChange={handleChange}
                    />
                  </div>
                  <div className=" flex ">
                    <label
                      htmlFor="noOfPersons"
                      className="w-[25%]"
                      style={{ minWidth: "114px" }}
                    >
                      No. of Persons:
                    </label>
                    <input
                      type="text"
                      style={{ borderRadius: "10px", width: "70%" }}
                      className="text-black p-1"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex ">
                    <label
                      htmlFor="permAdd"
                      className="w-[25%]"
                      style={{ minWidth: "114px" }}
                    >
                      Permanent Address:
                    </label>
                    <textarea
                      name="permAdd"
                      id="permAdd"
                      rows="4"
                      className="w-[70%] text-black"
                      style={{ borderRadius: "10px" }}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="flex ">
                    <label
                      htmlFor="contAdd"
                      className="w-[25%]"
                      style={{ minWidth: "114px" }}
                    >
                      Contact Address:
                    </label>
                    <textarea
                      name="contAdd"
                      id="contAdd"
                      rows="4"
                      className="w-[70%] text-black"
                      style={{ borderRadius: "10px" }}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className=" flex ">
                    <label
                      htmlFor="phNo"
                      className="w-[25%]"
                      style={{ minWidth: "114px" }}
                    >
                      Phone No:
                    </label>
                    <input
                      type="text"
                      style={{ borderRadius: "10px", width: "70%" }}
                      className="text-black p-1"
                      onChange={handleChange}
                    />
                  </div>
                  <div className=" flex ">
                    <label
                      htmlFor="email"
                      className="w-[25%]"
                      style={{ minWidth: "114px" }}
                    >
                      Email id:
                    </label>
                    <input
                      type="text"
                      style={{ borderRadius: "10px", width: "70%" }}
                      className="text-black p-1"
                      onChange={handleChange}
                    />
                  </div>
                  <div className=" flex ">
                    <label
                      htmlFor="CheckIn"
                      className="w-[25%] my-2"
                      style={{ minWidth: "114px" }}
                    >
                      Check in:
                    </label>
                    <input
                      type="date"
                      name="CheckIn"
                      id="CheckIn"
                      className="rounded-md p-2 w-[12rem] text-black mx-1"
                      onChange={handleChange}
                    />
                  </div>
                  <div className=" flex ">
                    <label
                      htmlFor="CheckOut"
                      className="w-[25%] my-2"
                      style={{ minWidth: "114px" }}
                    >
                      Check out:
                    </label>
                    <input
                      type="date"
                      name="CheckOut"
                      id="CheckOut"
                      className="rounded-md p-2 w-[12rem] text-black mx-1"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <br />
                <center>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                    style={{
                      padding: "10px",
                      borderRadius: "10px",
                      width: "15%",
                      minWidth: "94px",
                    }}
                  >
                    Submit
                  </button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestRoomBook;
