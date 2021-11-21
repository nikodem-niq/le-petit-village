import {
  CalendarToday,
  PermIdentity,
} from "@material-ui/icons";
import "./user.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';
import FadingBalls from "react-cssfx-loading/lib/FadingBalls";

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from "../../utils/config";


const User = (props) => {
  const [isModal, setModal] = useState(false);
  const [isErrorModal, setErrorModal] = useState(false);
  const [isBadPassword, setBadPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch(name) {
      case 'oldPassword':
        setOldPassword(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
    }
  }

  const handleSubmit = (e) => {
    const data = {
      oldPassword,newPassword, id:props.match.params.id
    }


    axios({
      method: 'post',
      url: '/user/update',
      headers: {
          'Content-Type': 'application/json',
          'x-access-token' : localStorage.getItem('userToken')
      },
      data
    }).then(res => {
      if(res.status === 200 || res.status === '200') {
        setModal(true);
      } else if(res.status === 400 || res.status === '400') {
        setModal(true)
        setBadPassword(true);
      }
    }).catch(err => {
      setErrorModal(true)
      setModal(true);
    })
    e.preventDefault();
    setTimeout(() => {
        window.location.reload()
    }, 1500)
  }

    const fetchData = async () => {
      axios({
        method: 'get',
        url: `/user/fetch?id=${props.match.params.id}`,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : localStorage.getItem('userToken')
        },
    }).then(res => {
      setLoading(false)
      res.data.rows[0].dateCreated = moment(res.data.rows[0].dateCreated).format('L')
      setData(res.data.rows[0]);
      setLoading(false);
    })
    }

    useEffect(() => {
      setLoading(true);
      fetchData();

    }, [])

    if(isLoading) {
      return (
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}><FadingBalls color="#3a43cc" width="20px" height="20px" duration="2s" /></div>
      )
  } else {
  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
    <Topbar/>
   <div style={{display: 'flex'}}>
    <Sidebar activeUsers/>

    <div>
      <Modal
        open={isModal}
        onClose={() => {setModal(false); setErrorModal(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {!isErrorModal && !isBadPassword ? <p style={{color: 'green'}}>Successfully changed user's password!</p> : <p style={{color: 'red'}}>Invalid credentials! <br/> or lost connection! Try again!</p>}
          </Typography>
        </Box>
      </Modal>
    </div>

    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{data.login}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{data.dateCreated}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Change password</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  value={data.login}
                  disabled
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Old password</label>
                <input
                  onChange={handleChange}
                  name="oldPassword"
                  type="password"
                  placeholder="******"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>New password</label>
                <input
                  onChange={handleChange}
                  name="newPassword"
                  type="password"
                  placeholder="******"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateRight">
                <button onClick={handleSubmit} className="userUpdateButton">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
  )};
}

export default User;