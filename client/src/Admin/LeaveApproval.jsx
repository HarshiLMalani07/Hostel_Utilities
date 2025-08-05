import React, { useEffect } from "react";
import homeimg from "./../assets/svg/Home-white.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const LeaveApproval = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchAllLeaves = async () => {
      try {
        const res = await axios.get("http://localhost:5001/admin/grantleave");
        console.log(res.data);
        setLeaves(res.data);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };
    fetchAllLeaves();
  }, []);

  const handleReject = async (id) => {
    try {
      await axios.get("http://localhost:5001/admin/rejectleave/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    // setCheckOffcolor("bg-green-500");
  };
  const handleGrant = async (id) => {
    try {
      await axios.get("http://localhost:5001/admin/grantleave/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    // setCheckOffcolor("bg-green-500");
  };
  return (
    <>
      <div className="md:w-[85vw] w-[100%] sticky left-[20vw] bg-gray-800 text-white lg:p-8 p-1">
        <div style={{ padding: "0px 99px" }}>
          <div className="path p-2 flex items-center text-xl header">
            <img src={homeimg} alt="home" />
            <p className="pl-4 text-3xl">
              <Link to="/"> Home </Link> / Leave Approval
            </p>
          </div>
        </div>
        {/* To be done through map */}
        <div className="leaves lg:p-6 p-2 text-black lg:text-2xl flex items-center flex-col">
          {leaves.map((leave) => (
            <div
              key={leave.leave_id}
              className="leave lg:w-[90%] w-[90%] bg-slate-300 rounded-[30px] lg:p-8 lg:px-14 p-4 px-7 py-4 my-3 flex justify-between items-center md:flex-row flex-col"
            >
              <div className="md:w-[60%] w-[100%] ">
                <p>Roll No : {leave.roll_no}</p>
                <br />
                <div className="flex justify-between">
                  <p>From : {leave.l_from.slice(0, 10)} {leave.l_from.slice(11, 19)} </p>
                  <p className=" pr-20">To : {leave.l_upto.slice(0, 10)} {leave.l_upto.slice(11, 19)}</p>
                </div>
                <br />
                <p>Reason for leave : {leave.reason}</p>
              </div>
              <div className="w-[40%] flex justify-center items-center lg:flex-row flex-row md:flex-col">
                <div className="del flex justify-center items-center  text-white rounded-3xl px-8 py-1 my-1 mx-6">
                  <button
                    onClick={() => handleReject(leave.leave_id)}
                    className={`${leave.permission === '1' ? 'hidden' : ''} del flex justify-center items-center bg-red-600 text-white rounded-3xl px-8 py-3 my-1 mx-6`}
                  >
                    <span>
                      {leave.permission === '-1'
                        ? "Rejected permission"
                        : "Reject permission"}
                    </span>
                  </button>
                  <button
                    onClick={() => handleGrant(leave.leave_id)}
                    className={`${leave.permission === '-1' ? 'hidden' : ''} bg-green-500 flex justify-center items-center text-white rounded-3xl px-8 py-3 my-1 mx-6 `}
                  >
                    <span>
                      {leave.permission === '1'
                        ? "Granted permission"
                        : "Grant permission"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LeaveApproval;
