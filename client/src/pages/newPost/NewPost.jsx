import "./newPost.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import JoditEditor from 'jodit-react';
import {useState, useRef} from 'react';
import axios from 'axios'

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from '../../utils/config';


export default function NewProduct() {

  const [isModal, setModal] = useState(false);
  const [isErrorModal, setErrorModal] = useState(false);

	const editor = useRef(null)
  // States for inputs
  const [heroImg, setHeroImg] = useState('');
  const [header, setHeader] = useState('');
  const [subHeader, setSubHeader] = useState('');
	const [content, setContent] = useState('')
	const [duration, setDuration] = useState(0)
	const [cost, setCost] = useState(0)
	
	const config = {
		readonly: false,
    allowResizeX: true
	}

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch(name) {
      case 'heroImg':
        setHeroImg(value);
        break;
      case 'header':
        setHeader(value);
        break;
      case 'subHeader':
        setSubHeader(value);
        break;
      case 'duration':
        setDuration(parseInt(value));
        break;
      case 'cost':
        setCost(parseInt(value));
        break;
    }
  }


  const handleSubmit = (e) => {
    const data = {
      heroImg, header, subHeader, content, duration, cost
    }


    axios({
      method: 'post',
      url: '/programs/post',
      headers: {
          'Content-Type': 'application/json',
          'x-access-token' : localStorage.getItem('userToken')
      },
      data
    }).then(res => {
      if(res.status === 200 || res.status === '200') {
        setModal(true);
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
    <Sidebar activePosts/>


    <div>
      <Modal
        open={isModal}
        onClose={() => {setModal(false); setErrorModal(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {!isErrorModal ? <p style={{color: 'green'}}>Successfully added program!</p> : <p style={{color: 'red'}}>Connection lost! Try again</p>}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>


    <div className="newProduct">
      <h1 className="addProductTitle">New Program</h1>
      <form className="addProductForm">

      <div className="addProductItem">
          <label>Hero image source</label>
          <input type="text" onBlur={handleChange} id="heroImg" name="heroImg" placeholder="Hero image source.. (url to image)" required/>
        </div>

        <div className="addProductItem">
          <label>Header</label>
          <input type="text" onBlur={handleChange} id="header" name="header" placeholder="Header.." required/>
        </div>

        <div className="addProductItem">
          <label>Sub Header</label>
          <input type="text" onBlur={handleChange} id="subHeader" name="subHeader" placeholder="Sub header.." required/>
        </div>

        <div id="contentEditor" className="addProductItem">
        <label>Content</label>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        />
        </div>

        <div className="addProductItem">
          <label>Duration</label>
          <input type="number" onBlur={handleChange} id="duration" name="duration" placeholder="Duration.. (in minutes)" required/>
        </div>

        <div className="addProductItem">
          <label>Cost</label>
          <input type="number" onBlur={handleChange} id="cost" name="cost" placeholder="Cost.." required/>
        </div>

        <button className="addProductButton" onClick={handleSubmit}>New post </button>
      </form>
    </div>
    </div>
    </div>
  );
}
