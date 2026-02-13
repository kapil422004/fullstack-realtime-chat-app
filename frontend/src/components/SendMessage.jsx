import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";

axios.defaults.withCredentials = true;

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const backendUrl = import.meta.env.VITE_BACKEND_MESSAGE_URL;
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      const res = await axios.post(
        backendUrl + "/send/" + `${selectedUser?._id}`,
        { message },
      );
      console.log(res.data);
      dispatch(setMessages([...messages, res?.data?.newMessage]));
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="w-full relative px-5">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Enter a message!"
          className="h-full w-full  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 flex gap-2 items-center rounded-full  p-3 cursor-pointer mb-3 outline-none text-black "
        />

        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 items-center pr-10"
        >
          <IoIosSend size="24px" className="text-black cursor-pointer" />
        </button>
      </div>
    </form>
  );
};

export default SendMessage;
