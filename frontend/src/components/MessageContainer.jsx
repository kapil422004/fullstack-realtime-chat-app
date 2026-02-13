import React from "react";
import SendMessage from "./SendMessage";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser, authUser } = useSelector((store) => store.user);

  return (
    <>
      {selectedUser !== null ? (
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col md:min-w-[450px] px-5">
            <div className="h-full w-full  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 flex gap-2 items-center rounded-full   p-1 cursor-pointer mb-3">
              <div className="avatar online">
                <div className="w-12 rounded-full">
                  <img src={selectedUser?.profilePhoto} alt="" />
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex gap-2 justify-between text-black">
                  <p>{selectedUser?.fullName}</p>
                </div>
              </div>
            </div>
          </div>
          <Messages />
          <SendMessage />
        </div>
      ) : (
        <div className="flex flex-col md:min-w-[450px] justify-center items-center">
          <h1 className="text-3xl font-bold font-serif text-black">
            Hi,
            {authUser?.fullName}!! <br />
            Say hello and <br /> break the silence.👋
          </h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
