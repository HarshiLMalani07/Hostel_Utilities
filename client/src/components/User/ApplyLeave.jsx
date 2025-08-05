import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import homeimg from "./../../assets/svg/Home-white.png";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ApplyLeave = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const [newLeave, setNewLeave] = useState({
    Name: "",
    Roll_No: "",
    Room_No: "",
    Gender: "",
    Program: "",
    Branch: "",
    Reason_for_leave: "",
    From_: "",
    Upto_: "",
    Residential_Address: "",
    Contact_No: "",
    Contact_No_of_Parents: "",
  });
  // console.log(newLeave)

  const handleChange = (e) => {
    setNewLeave((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/user/leaveapplication", newLeave);
      console.log(newLeave);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className={`md:w-[85vw] w-[100%] sticky left-[20vw] bg-gray-800 text-white lg:p-8 p-1 `}
      >
        <div className="px-16">
          <div className=" path p-2 flex items-center text-xl header">
            <img src={homeimg} alt="home" />
            <p className="pl-4 text-3xl">Home / Apply for leave</p>
          </div>
        </div>
        <div className="main-container flex justify-center items-center py-5">
          <div
            className="container w-[75vw] block justify-center items-center"
            style={{ borderRadius: "10px" }}
          >
            <div
              className="header flex bg-white h-[6vh] items-center "
              style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <FontAwesomeIcon
                icon={faPen}
                size="lg"
                className="py-3 pl-3 flex"
                style={{ color: "#000000" }}
              />
              <p className="text-black p-3 text-2xl">Entry/Exit at Main Gate</p>
            </div>
            <div
              className="content px-7 py-2"
              style={{
                backgroundColor: "rgb(85, 88, 98)",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              <div className="main-content text-white p-2 text-2xl  !!!!!!!!!!!!!max-sm:{flex flex-col justify-center }">
                <form onSubmit={handleSubmit} method="post">
                  <p className="py-3">Application No.: XYZ123</p>
                  <div className="n-rlno-rmno py-2 flex justify-between flex-wrap">
                    <div className="name my-5">
                      <label htmlFor="Name">Name: </label>
                      <input
                        type="text"
                        name="Name"
                        id="Name"
                        style={{ borderRadius: "10px" }}
                        className="rounded-md w-[19.5rem] p-2 mx-1 text-black"
                        placeholder="Enter your name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="rollno my-5">
                      <label htmlFor="Roll_No">Roll No.: </label>
                      <input
                        type="text"
                        name="Roll_No"
                        id="Roll_No"
                        className="rounded-md p-2 w-[12rem] mx-1 text-black"
                        placeholder="e.g. 22bcs001"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="roomno my-5">
                      <label htmlFor="Room_No">Room No.: </label>
                      <input
                        type="text"
                        name="Room_No"
                        id="Room_No"
                        className="rounded-md p-2 w-[9rem] mx-1 text-black"
                        placeholder="e.g. X-101"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="ge-pr-br flex justify-between flex-wrap">
                    <div className="gender my-5">
                      <label htmlFor="Gender">Gender: </label>
                      <select
                        name="Gender"
                        id="Gender"
                        className="rounded-md p-2 w-[15rem] text-black mx-1"
                        onChange={handleChange}
                        required
                      >
                        <option value="none">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="transgender">Transgender</option>
                        <option value="none">Prefer not to say</option>
                      </select>
                    </div>
                    <div className="program my-5">
                      <label htmlFor="Program">Program: </label>
                      <select
                        name="Program"
                        id="Program"
                        className="rounded-md p-2 w-[15rem] text-black mx-1"
                        onChange={handleChange}
                        required
                      >
                        <option value="none">Select Discipline</option>
                        <option value="btech">B.Tech</option>
                        <option value="mtech">M.Tech</option>
                        <option value="bdes">B.Des</option>
                        <option value="mdes">M.Des</option>
                        <option value="phd">Ph.D</option>
                      </select>
                    </div>
                    <div className="branch my-5">
                      <label htmlFor="Branch">Branch: </label>
                      <select
                        name="Branch"
                        id="Branch"
                        className="rounded-md p-2 w-[13rem] text-black mx-1"
                        onChange={handleChange}
                        required
                      >
                        <option value="none">Select Branch</option>
                        <option value="cse">CSE</option>
                        <option value="female">ECE</option>
                        <option value="female">Des</option>
                        <option value="female">ME</option>
                        <option value="female">SM</option>
                        <option value="female">NS</option>
                        <option value="female">LA</option>
                      </select>
                    </div>
                  </div>
                  <div className="realea flex my-7">
                    <label htmlFor="Reason_for_leave" className="me-2">
                      Reason for leave:
                    </label>
                    <textarea
                      name="Reason_for_leave"
                      id="Reason_for_leave"
                      placeholder="Type reason here..."
                      className="rounded-md p-2 text-black w-[85%] mx-1"
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="leadur flex flex-wrap my-11 items-center">
                    <label htmlFor="leaveduratn max-md:my-5">
                      Leave Duration:
                    </label>
                    <div className="duratn flex flex-wrap max-md:justify-center">
                      <div className="ldfm md:mx-7 max-md:mx-2 max-md:my-3">
                        <label htmlFor="From_">From </label>

                        <input
                          type="date"
                          name="From_"
                          id="From_"
                          className="rounded-md p-2 w-[12rem] text-black mx-1"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="ldupto max-md:{my-2} max-md:mx-2">
                        <label htmlFor="Upto_">Upto </label>
                        <input
                          type="date"
                          name="Upto_"
                          id="Upto_"
                          className="rounded-md p-2 w-[12rem] text-black mx-1"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="realea flex my-9 me-2">
                    <label htmlFor="Residential_Address" className="">
                      Residential Address:
                    </label>
                    <textarea
                      name="Residential_Address"
                      id="Residential_Address"
                      placeholder="Enter address here..."
                      className="rounded-md p-2 text-black w-[85%] mx-1"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mobno my-10 flex flex-wrap ">
                    <div className="name me-[20rem] flex max-md:items-center">
                      <label htmlFor="Contact_No">Contact No.: </label>
                      <input
                        type="text"
                        name="Contact_No"
                        id="Contact_No"
                        className="rounded-md p-2 w-[14rem] text-black mx-1  max-md:mx-4 max-md:items-center"
                        placeholder="Enter mobile no."
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="contnopa max-md:my-6 ">
                      <label htmlFor="Contact_No_of_Parents">Contact No. of Parents: </label>
                      <input
                        type="text"
                        name="Contact_No_of_Parents"
                        id="Contact_No_of_Parents"
                        className="rounded-md p-2 w-[14rem] text-black mx-1 md:my-6"
                        placeholder="Enter mobile no."
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="decla ">
                    <input
                      type="checkbox"
                      id="agreement"
                      name="agreement"
                      value="agreement"
                      required
                      style={{ width: "25px", height: "25px" }}
                      onChange={handleChange}
                    />
                    <label htmlFor="agreement">
                      {" "}
                      Declaration : Yes, I agree that I have taken the consent
                      of my parents for this leave and I will be responsible for
                      maintaining more than 75% attendance during current
                      semester.
                    </label>
                  </div>
                  <div className="btn flex justify-center items-center">
                    <button
                      type="submit"
                      className="text-white text-2xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 my-5 w-150 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyLeave;
