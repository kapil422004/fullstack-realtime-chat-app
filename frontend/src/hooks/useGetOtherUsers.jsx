import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

axios.defaults.withCredentials = true;

const useGetOtherUsers = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_USER_URL;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(backendUrl + "/");
        // console.log(res);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
};

export default useGetOtherUsers;
