import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector((store) => store.message);

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  if (!messages) return;

  return (
    <div className="px-8 flex-1 overflow-auto ">
      {messages &&
        messages?.map((message) => {
          return <Message key={message._id} message={message} />;
        })}

      <div ref={bottomRef} />
    </div>
  );
};

export default Messages;
