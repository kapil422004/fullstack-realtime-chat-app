import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const backendUserUrl = import.meta.env.VITE_BACKEND_USER_URL;
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(backendUserUrl + "/login", {
        userName,
        password
      })

      if(res.data.success){
        toast.success(res.data.message)
        console.log(res.data)
        navigate("/")
        dispatch(setAuthUser(res.data))
      }
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");

      
    }


  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="h-full w-full bg-gray-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 p-6 shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        <form 
        onSubmit={onSubmitHandler}
        action="">
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
          <div>
            <label className="lable p-2">
              <span className="text-base label-text ">Password</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full input input-bordered h-10 outline-none"
                type="password"
                placeholder="Password"
              />
            </label>
          </div>

          <div className="text-sm flex items-center mt-3">
            <p>
              Don't have an account?{" "}
              <Link className="text-blue-700" to="/signup">
                {" "}
                Signup here.
              </Link>{" "}
            </p>
          </div>
          <div>
            <button type="submit" className="btn btn-block btn-md mt-3 p-4">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
