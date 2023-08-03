import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import SecureRoute from "./routes/SecureRoute";

function App() {
  
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/" element={<SecureRoute/>}/>
      <Route path="/home" element={<Home/>}/>
     </Routes>
     <ToastContainer/>
     </BrowserRouter>
    </>
  )
}

export default App
