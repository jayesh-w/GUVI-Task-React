import React from 'react';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../useToken.js';
import { useNavigate } from 'react-router-dom';


async function loginUser(credentials) {
 return fetch('https://mysterious-harbor-20936.herokuapp.com/api/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

const notify = (message) => toast(message);

export default function Login() {
let navigate = useNavigate();

const { token , setToken } = useToken();
const [email, setEmail] = useState();
const [password, setPassword] = useState();

const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password
    });
    if(response.success) {
        setToken(response.token)
        navigate("/",{replace:true})
    }
    else {
        notify(response.message)

    }
}
  return (
    
  	<center>
    <div className="login-form">
    	<h3>Welcome to Test Project</h3>
    	<hr />
    	<form onSubmit={handleSubmit}>
    		<label> 
    			
    			<input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
    		</label>
    		<label> 
    			
    			<input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
    		</label>
    		<hr/>
    		<div>
    		<button type="submit"> Submit</button>
    		</div>
    	</form>

    	<div className="register-link">
    		<p>Don't Have an Account? <Link to="/register"> Register Now</Link></p>
    	</div>

    </div>
     <ToastContainer />
    </center>

  );
}


