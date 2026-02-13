import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";

axios.defaults.withCredentials = true;

const Sidebar = () => {
  const backendUserUrl = import.meta.env.VITE_BACKEND_USER_URL;
  const navigate = useNavigate();
  // const { authUser, otherUsers, selectedUser} = useSelector((store) => store.user)
  const { messages } = useSelector((store) => store.message);
  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const logoutHandler = async () => {
    try {
      const res = await axios.get(backendUserUrl + "/logout");
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
      dispatch(setMessages(null));
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    const searchedUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()),
    );
    if(searchedUser){
      dispatch(setOtherUsers([searchedUser]))
    }else{
toast.error("User not found!")
    }
  };

  return (
    <div>
      <form
        onSubmit={searchHandler}
        action=""
        className="flex items-center gap-2"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-full outline-none border-black p-5"
          placeholder="Search by name..."
          type="text"
        />
        <button type="submit" className="btn rounded-full p-2">
          <IoIosSearch size="24px" />
        </button>
      </form>
      <div className="divider mt-1"></div>
      <OtherUsers />

      <div className="mt-5">
        <button
          onClick={logoutHandler}
          className="btn btn-hard text-white rounded-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
