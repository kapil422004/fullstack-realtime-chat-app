import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("messages value:", messages);

    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId === selectedUser?._id) {
        dispatch(setMessages([...messages, newMessage]));
      }
    });
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, selectedUser, messages]);
};

export default useGetRealTimeMessage;
