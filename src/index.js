import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Edit from './components/Edit';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';




ReactDOM.render(
  <BrowserRouter>
  	<Routes>
  		<Route path="/" element = { <App /> } />
  		<Route path="/login" element = { <Login /> } />
  		<Route path="/register" element = { <Register /> } />
  		<Route path="/edit" element = { <Edit /> } />
  	</Routes>
  </BrowserRouter>,
   
  document.getElementById('root')
);


