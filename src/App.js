import './css/App.css';
import  Navbar  from './components/Navbar.js';
import { Link } from 'react-router-dom';
import Login from './components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from './useToken.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


// This function is used to get Details of user from API
async function getDetails(get) {
 return fetch('https://mysterious-harbor-20936.herokuapp.com/api/get-user', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(get)
 })
   .then(data => {return data.json()})
}

const notify = (message) => toast(message);

function App() {
    
    // Setting up all the states
    const [username,setUsername] = useState();
    const [email,setEmail] = useState();
    const [gender,setGender] = useState();
    const [dob,setDob] = useState();
    const [blood,setBlood] = useState();
    const [contact,setContact] = useState();
    const [address,setAddress] = useState();
    const [age,setAge] = useState();

	const { token , setToken } = useToken();
    let navigate = useNavigate();
	if(!token) {
        window.location.href = "./login";
		navigate("/login",{replace:true});
	}
    else {
        const get = {token : JSON.parse(token)};
        getDetails(get)
        .then((data) => {
            setUsername(data.username);
            setEmail(data.email);
            setDob(data.details.dob);
            setBlood(data.details.blood);
            setContact(data.details.contact);
            setAddress(data.details.address);
            setGender(data.details.gender);
            setAge(data.details.age);
        })
        .catch(err => {console.log(err)});
        
    }

    // Setting up static link, Reason : states dont get update with fetch API ( Uncontrolled Component(functional) Error)
    const link = "edit/?gender="+gender+"&contact="+contact+"&dob="+dob+"&blood="+blood+"&age="+age+"&address="+address;
  return (
  	<div id="parent">
    <Navbar username="GUVI Task" />

    <div className="profile">
    	<div className="header">
    		<h1>Profile</h1>

    		<button id="edit"><Link to={ link } >Edit</Link></button>
    	</div>

    	<div className="body">
    		<p>Username : { username } </p>
            <p>Age : { age } </p>
    		<p>Email : { email }</p>
    		<p>Gender : { gender }</p>
    		<p>DOB : { dob }</p>
    		<p>Blood : { blood }</p>
    		<p>Contact : { contact }</p>
    		<p>Address : { address }</p>
    	</div>
    </div>
    <ToastContainer />
    </div>

  );
}

export default App;
