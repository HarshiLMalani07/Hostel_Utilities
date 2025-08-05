import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import homeimg from "./../../assets/svg/Home-white.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FileComplaint = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const [complaint, setComplaint] = useState({
    type: "",
    description: "",
    image: "",
    roll_no: "",
  });
  console.log(complaint)

  const handleChange = (e) => {
    setComplaint((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/user/newcomplaint", complaint);
      console.log(complaint);
      navigate("/mycomplaints");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="md:w-[85vw] w-[100%] sticky left-[20vw] bg-gray-800 text-white lg:p-8 p-1">
      <br />
      <center>
        <div
          style={{
            width: "90%",
            textAlign: "left",
            fontSize: "x-large",
            color: "white",
          }}
        >
          <div className="path p-2 flex items-center text-xl header">
            <img src={homeimg} alt="home" />
            <p className="pl-4 text-3xl">
              <Link to="/"> Home </Link>/ File a complaint
            </p>
          </div>
        </div>
      </center>
      <br />
      <div className="flex justify-center">
        <div className=" w-[90%] bg-slate-100" style={{ borderRadius: "10px" }}>
          <div className="flex items-center p-3 text-black">
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faPen} />
            &nbsp;&nbsp;
            <div className="text-2xl">Submit complaint</div>
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
              {/* <div>Complaint No. : XYZ123</div>
              <br /> */}
              <div className="flex">
                <div className="w-[50%]">
                  <label htmlFor="category">Category:</label>
                  <select
                    name="type"
                    id="category"
                    style={{
                      textAlign: "center",
                      width: "13rem",
                      marginLeft: "0.5vw",
                      minWidth: "122px",
                      borderRadius: "10px",
                      color: "black",
                    }}
                    onChange={handleChange}
                    required
                  >
                    <option value="none">Select category</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="electricity">Electricity</option>
                    <option value="water">Water</option>
                  </select>
                </div>
                <div className="w-[50%]">
                  <label htmlFor="roll_no">Roll No. :</label>
                  <input
                    type="text"
                    name="roll_no"
                    id="roll_no"
                    placeholder="ex: 22bxx001"
                    style={{
                      marginLeft: "0.5vw",
                      width: "25%",
                      minWidth: "122px",
                      textAlign: "center",
                      borderRadius: "10px",
                      color: "black",
                    }}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <br />
              <div style={{ display: "flex" }}>
                <label htmlFor="description">Description :</label>
                <textarea
                  style={{
                    marginLeft: "1vw",
                    borderRadius: "10px",
                    width: "40%",
                    color: "black",
                    padding: "10px",
                  }}
                  onChange={handleChange}
                  name="description"
                  id="description"
                  cols="42"
                  rows="5"
                  placeholder="Details should be here...."
                ></textarea>
              </div>
              <br />
              <div>
                <label>Complaint photo/video :</label>&nbsp;&nbsp;
                <input
                  type="file"
                  name="image"
                  id="image"
                  placeholder="ex:  A-403"
                  style={{
                    marginLeft: "0.5vw",
                    width: "25%",
                    minWidth: "122px",
                    textAlign: "center",
                    borderRadius: "10px",
                    color: "black",
                  }}
                  onChange={handleChange}
                  required
                />
                {/* <br/> 
              <input type="submit" value='Submit' style={{backgroundColor:'#3b82f6'}}/> */}
              </div>
              <br />
              <center>
                <button
                  className="bg-blue-600 hover:bg-blue-700"
                  type="submit"
                  style={{
                    // backgroundColor: "#3b82f6",
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
  );
};

export default FileComplaint;
