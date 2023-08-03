import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom"

import { errorToast, successToast } from '../services/Toastify.Sevices';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const submitHandler=async(e)=>{
        e.preventDefault(); 
        let data={email, password};
        const SERVER_URL=import.meta.env.VITE_SERVER_URL;
        try {
            const response = await axios.post(`${SERVER_URL}/users/login`, data);
            if(response.data.status){
                sessionStorage.setItem("isLoggedIn",true);
                successToast(response.data.message);
                navigate("/home");
               
            }
            
        } catch (error) {
            errorToast(response.data.message);
            
        }
        

    }

  return (
<Card className='bg-info w-25 position-absolute bottom-50 end-50'>
<Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>
    
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
</Card>
  )
}

export default Login