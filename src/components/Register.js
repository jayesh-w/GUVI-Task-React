import React from 'react';
import '../css/Register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../useToken.js';
import {Navigate} from 'react-router-dom';


// Function to Register API
async function registerUser(credentials) {
 return fetch('https://mysterious-harbor-20936.herokuapp.com/api/register', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

const notify = (message) => toast(message);

export default function Register() {
    const { token , setToken } = useToken();

    const [ email , setEmail ] = useState();
    const [ username , setUsername ] = useState();
    const [ password , setPassword ] = useState();
    const [ confirmPassword , setCPassword ] = useState();

    const handleSubmit = async e => {
    e.preventDefault();
    if (password === confirmPassword) {
        const response = await registerUser({
          email,
          username,
          password,
          confirmPassword
        });
        if(response.success) {
            setToken(response.token)
            return (<Navigate to="/" />)
        }
        else {
            notify(response.message)
        } 
    }
    else {
        notify("Passwords Do Not Match")
    }
    
}
  return (
  	<center>
    <div className="register-form">
    	<h3>Register to Test Project</h3>
    	<hr />
    	<form onSubmit={handleSubmit}>
            <label> 
                <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)} />
            </label>
    		<label> 
    			<input type="text" placeholder="username" onChange={e => setUsername(e.target.value)}/>
    		</label>
    		<label> 
    			<input type="text" placeholder="password" onChange={e => setPassword(e.target.value)}/>
    		</label>

            <label> 
                <input type="text" placeholder="retype password" onChange={e => setCPassword(e.target.value)}/>
            </label>
    		<hr/>
    		<div>
    		<button type="submit"> Submit</button>
    		</div>
    	</form>

    	<div className="register-link">
    		<p>Already have an Account? <Link to="/login"> Login Here</Link></p>
    	</div>

    </div>
    <ToastContainer />
    </center>
  );
}

