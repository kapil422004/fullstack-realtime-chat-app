import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

axios.defaults.withCredentials = true;

const useGetMessages = () => {
  const backendMessageUrl = import.meta.env.VITE_BACKEND_MESSAGE_URL;

  const { selectedUser } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser?._id) return;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          backendMessageUrl + "/" + `${selectedUser?._id}`,
        );
        dispatch(setMessages(res.data));
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessages;
