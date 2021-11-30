import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./posts.css";
import JoditEditor from 'jodit-react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { modalStyle } from "../../utils/config";

import FadingBalls from "react-cssfx-loading/lib/FadingBalls";



const Posts = (props) =>  {
    const [isModal, setModal] = useState(false);
    const [isErrorModal, setErrorModal] = useState(false);
  

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

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
      heroImg, header, subHeader, content, duration, cost, id: props.match.params.articleId
    }


    axios({
      method: 'post',
      url: '/articles/update',
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
    setTimeout(() => {
        window.location.reload()
    }, 1500)
  }

    const fetchData = async () => {
        axios({
          method: 'get',
          url: `/programs/fetch?programId=${props.match.params.programId}`,
          headers: {
              'Content-Type': 'application/json',
              'x-access-token' : localStorage.getItem('userToken')
          },
      }).then(res => {
        res.data.map((row) => {
          row['id'] = row.programId;
        })
        setLoading(false)
        setData(res.data[0]);
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
    <Sidebar activePosts/>
  <div className="product">

  <div>
      <Modal
        open={isModal}
        onClose={() => {setModal(false); setErrorModal(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {!isErrorModal ? <p style={{color: 'green'}}>Successfully edited post!</p> : <p style={{color: 'red'}}>Connection lost! Try again</p>}
          </Typography>
        </Box>
      </Modal>
    </div>

    <div className="productTop">
    </div>
    <div className="newProduct">
      <form className="addProductForm">
        <div className="productTopRight">
                <EditIcon/>
                <span className="productName"> You're editing post no. {data.programId}</span>
            <div className="productInfoBottom">
            </div>
        </div>

      <div className="addProductItem">
          <label>Hero image source</label>
          <input type="text" onBlur={handleChange} id="heroImg" name="heroImg" placeholder={`Currently: ${data.heroImg}`} required/>
        </div>

        <div className="addProductItem">
          <label>Header</label>
          <input type="text" onBlur={handleChange} id="header" name="header" placeholder={`Currently: ${data.header}`} required/>
        </div>

        <div className="addProductItem">
          <label>Sub Header</label>
          <input type="text" onBlur={handleChange} id="subHeader" name="subHeader" placeholder={`Currently: ${data.subHeader}`} required/>
        </div>

        <div id="contentEditor" className="addProductItem">
        <label>Content</label>
        <JoditEditor
          ref={editor}
          value={data.content}
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

        <button className="addProductButton" onClick={handleSubmit}>Edit post </button>
      </form>
    </div>
  </div>
  </div>
  </div>
  );}
}

export default Posts;
