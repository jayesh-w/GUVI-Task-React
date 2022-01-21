import React from 'react';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


export default function Navbar(props) {
  const navigate = useNavigate();

function logout() {
    localStorage.clear()
    navigate("/login",{replace:true})
}
  return (
  	<div id="navbar">
        <p id="navhead">{props.username}</p>
        <button onClick={logout}>Logout</button>
    </div>
  );
}

