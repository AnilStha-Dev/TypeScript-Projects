import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();
  const logoutHandler=(e)=>{
    sessionStorage.setItem("isLoggedIn",false);
    e.preventDefault();
    navigate("/");
  }
  return (
    <>
    <div>HomePage</div>
    <button className='btn btn-danger' onClick={logoutHandler}>Logout</button></>
  )
}

export default Home;




