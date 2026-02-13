import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

const { authUser } = useSelector((store) => store.user); // 👈 authUser not user
const navigate = useNavigate();

useEffect(() => {
  if(!authUser){
    navigate('/login');
  }
}, [authUser]); // 👈 add authUser as dependency

  return (
    <div className=" flex sm:h-[450px] md:h-[600px] bg-gray-0 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 p-6 shadow-md" >
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default HomePage