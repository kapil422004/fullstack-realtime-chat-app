import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const backendUserUrl = import.meta.env.VITE_BACKEND_USER_URL;
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(backendUserUrl + "/register", {
        fullName,
        userName,
        password,
        confirmPassword,
        gender,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    // setFullName("");
    // setUserName("");
    // setPassword("");
    // setConfirmPassword("");
    // setGender("");
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="h-full w-full bg-gray-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 p-6 shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div className="mb-3">
            <label className="lable p-2">
              <span className="text-base label-text">Full name</span>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full input input-bordered h-10 outline-none"
                type="text"
                placeholder="Full name"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="lable p-2">
              <span className="text-base label-text">Username</span>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full input input-bordered h-10 outline-none"
                type="text"
                placeholder="Username"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="lable p-2">
              <span className="text-base label-text">Password</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full input input-bordered h-10 outline-none"
                type="password"
                placeholder="Password"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="lable p-2">
              <span className="text-base label-text">Confirm Password</span>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full input input-bordered h-10 outline-none"
                type="password"
                placeholder="Confirm Password"
              />
            </label>
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input
                checked={gender === "male"}
                onChange={(e) => setGender("male")}
                type="checkbox"
                className="checkbox mx-2 border-gray-800"
              />
            </div>

            <div className="flex items-center">
              <p>Female</p>
              <input
                checked={gender === "female"}
                onChange={(e) => setGender("female")}
                type="checkbox"
                className="checkbox mx-2 border-gray-800"
              />
            </div>
          </div>
          <div className="text-sm flex items-center">
            <p>
              Already have an account?{" "}
              <Link className="text-blue-700" to="/login">
                {" "}
                Login here.
              </Link>{" "}
            </p>
          </div>
          <div>
            <button type="submit" className="btn btn-block btn-md mt-3 p-4">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
