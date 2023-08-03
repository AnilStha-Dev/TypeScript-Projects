import{useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../App.css'
import { postData } from '../services/axios.service';
import { successToast } from '../services/toastify.service';
import {  useNavigate } from 'react-router-dom';

const Login = () => {
  
    const navigate = useNavigate();
    const [email, setEmail]=useState();
    const [password,setPassword]=useState();

  const handleLogin=async(e:any)=>{
        e.preventDefault();
        const data={email,password};
        const response=await postData('users/login',data);
        
        if(response&&response.status){
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("jwt", response.data.jwt);
            navigate("/lectures")
            successToast(response.message);
        }

    }
  return (
    <Card className='bg-info w-25 position-absolute bottom-50 end-50'>
    <Form >
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e:any)=>setEmail(e.target.value)} />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e:any)=>setPassword(e.target.value)} />
          </Form.Group>
        
         <button className='btn btn-primary' onClick={(e)=>handleLogin(e)}>Login</button>
        </Form>
    </Card>
  )
}

export default Login