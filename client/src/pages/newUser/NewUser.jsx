import "./newUser.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from '../../utils/config';


const NewUser = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [isModal, setModal] = useState(false);
  const [isErrorModal, setErrorModal] = useState(false);
  const [usersExists, setUserExists] = useState(false);


  const handleChange = (event) => {
    const { name, value } = event.target;

    switch(name) {
      case 'login':
        setLogin(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  }

  const handleSubmit = (e) => {
    const data = {
      login, 
      password
    }

    axios({
      method: 'post',
      url: '/user/register',
      headers: {
          'Content-Type': 'application/json',
          'x-access-token' : localStorage.getItem('userToken')
      },
      data
    }).then(res => {
      if(res.status === 200 || res.status === '200') {
        setModal(true);
      } else if(res.status === 401 || res.status === '401') {
        setModal(true);
        setUserExists(true);
      }
    }).catch(err => {
      setErrorModal(true)
      setModal(true);
    })
    e.preventDefault();
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
    <Topbar/>
    <div style={{display: 'flex'}}>
    <Sidebar activeUser/>

    <div>
      <Modal
        open={isModal}
        onClose={() => {setModal(false); setErrorModal(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {!isErrorModal && !usersExists ? <p style={{color: 'green'}}>Successfully registered an user!</p> : <p style={{color: 'red'}}>Login exists! <br/> or connection lost! Try again!</p>}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>

    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Login</label>
          <input type="text" onChange={handleChange} name="login" id="login" placeholder="john" required/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" onChange={handleChange} name="password" id="password" placeholder="******" required/>
        </div>

        <button onClick={handleSubmit} className="newUserButton">Register new user</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default NewUser;