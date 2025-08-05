import React, { useState } from "react";
import bgImg from "./../../assets/images.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    user_id: "",
    pass: "",
    role: "", // Added role in the state
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/login", credentials)
      .then((res) => {
        if (res.data.Status === "Success") {
          props.handleRoleChange(credentials.role);
          if (credentials.role === "student") {
            navigate("/");
          } else {
            navigate("/admin");
          }
          localStorage.setItem("token", res.data.authToken);
          // window.location.reload();
          console.log("Role after login:", credentials.role); // Log the role
        } else {
          alert("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRoleChange = (e) => {
    setCredentials({ ...credentials, role: e.target.value });
  };

  return (
    <div
      className={`w-[100%] sticky left-[20vw] bg-gray-800 text-white lg:p-8 p-1 bg-no-repeat flex justify-center items-center ${
        !localStorage.getItem("token") ? " md:w-[100vw] " : " md:w-[85vw] "
      }`}
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div className="rounded-xl bg-gray-800 bg-opacity-40 px-12 py-10 shadow-lg backdrop-blur-md max-sm:px-8 md:w-[80%] w-[80%] xl:w-[50%] h-[70vh] flex justify-center items-center">
        <div className="text-white w-[70%] text-center flex justify-center items-center flex-col">
          <div className="mb-8 flex flex-col items-center">
            <img
              src="https://www.logo.wine/a/logo/Google/Google-Logo.wine.svg"
              width="150"
              alt=""
              srcSet=""
            />
            <h1 className="mb-2 text-2xl">Login</h1>
            <span className="text-gray-300">Enter Login Details</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-blue-700 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                id="email"
                type="email"
                name="email"
                onChange={(e) =>
                  setCredentials({ ...credentials, user_id: e.target.value })
                }
                placeholder="id@email.com"
              />
            </div>

            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-blue-700 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                id="password"
                type="Password"
                name="password"
                onChange={(e) =>
                  setCredentials({ ...credentials, pass: e.target.value })
                }
                placeholder="password"
              />
            </div>

            <div className="mb-4 text-lg">
              <select
                className="rounded-3xl border-none bg-blue-700 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                onChange={handleRoleChange}
                value={credentials.role}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">Caretaker</option>
                <option value="student">Student</option>
                <option value="worker">Worker</option>
              </select>
            </div>

            <div className="mt-8 flex justify-center text-lg text-black">
              <button
                type="submit"
                className="rounded-3xl bg-blue-700 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-blue-950"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
