import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(user._id)

  const selectUserHandler = (user) => {
    try {
      dispatch(setSelectedUser(user));
      // console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        onClick={() => selectUserHandler(user)}
        className={` ${selectedUser?._id === user?._id ? "bg-cyan-100" : ""} h-full w-full  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 flex gap-2 items-center rounded-full   hover:bg-cyan-100 p-1 cursor-pointer mb-3`}
      >
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-2 justify-between text-black">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherUser;
