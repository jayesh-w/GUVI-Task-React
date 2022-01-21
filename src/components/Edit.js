import '../css/Edit.css';
import  Navbar  from './Navbar.js';
import { Link } from 'react-router-dom';
import Login from './Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../useToken.js';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';


// PUT METHOD TO SERVER
async function updateUser(data_request) {
    return fetch('https://mysterious-harbor-20936.herokuapp.com/api/update-user', {
   method: 'PUT',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(data_request)
 })
   .then(data => data.json())
}

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



function Edit() {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const gender = params.get('gender');
    const dob = params.get('dob');
    const contact = params.get('contact');
    const blood = params.get('blood');

    const age = params.get('age');
    const address = params.get('address');

    // Using indirect method to Update the state Reason: Uncontrolled Component Error
    let navigate = useNavigate();
    const nullEntry = {
        blood:blood,
        dob:dob,
        address:address,
        gender:gender,
        contact:contact,
        age:age
    }
   const [state,editState] = useState(nullEntry);
   const { token , setToken } = useToken();
    if(!token) {
        navigate("/login",{replace:true})
    }
    

    

  
    // This function submits the data 
    const handleSubmit = async e => {
        e.preventDefault();
        const response = await updateUser({
            token:JSON.parse(token),
            blood:state.blood,
            dob:state.dob,
            gender:state.gender,
            contact:state.contact,
            address:state.address,
            age:state.age
          
        });
        if(response.success) {
            navigate("/",{replace:true})

        }
        else {
            notify(response.message)
        }
    }

    function handleEdit(e) {
        let newEntry = { ...state };
        newEntry[e.target.name] = e.target.value;
        editState(newEntry);
    }
    




  return (
  	<div id="parent">
    <Navbar username="GUVI Task" />

    <div className="profile">
    	<div className="header">
    		<h1>Edit Profile  </h1>
    		<button id="edit"><Link to="/">Back</Link></button>
    	</div>

    	<div className="body">
        <center>
        <form onSubmit={handleSubmit}>
    		<label> 
                <input type="text" name="gender" defaultValue={ gender } onChange={ handleEdit } placeholder="gender" />
            </label>

             <label> 
                <input type="number" name="age" defaultValue={age} onChange={handleEdit} placeholder="age"/>
            </label>

            <label> 
                <input type="date" name="dob" defaultValue={ dob } onChange={handleEdit} placeholder="dob" />
            </label>
            <label> 
                <input type="text" name="blood" defaultValue={blood} onChange={handleEdit} placeholder="blood"/>
            </label>

            <label> 
                <input type="text" name="contact" defaultValue={contact} onChange={handleEdit} placeholder="contact"/>
            </label>

             <label> 
                <input type="text" name="address" defaultValue={address} onChange={handleEdit} placeholder="address"/>
            </label>

            <button id="save">Save</button>
            </form>
        </center>
    	</div>
    </div>
    </div>

  );
}

export default Edit;
