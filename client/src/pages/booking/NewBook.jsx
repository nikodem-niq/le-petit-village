import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import {useState, useEffect} from 'react';
import axios from 'axios'

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from '../../utils/config';


const NewBook = () => {
    const [fetchedPrograms, setFetchedPrograms] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const fetchData = async () => {
        axios({
          method: 'get',
          url: `/programs/fetch`,
          headers: {
              'Content-Type': 'application/json',
              'x-access-token' : localStorage.getItem('userToken')
          },
      }).then(res => {
        res.data.map((row) => {
          row['id'] = row.programId;
        })
        setLoading(false)
        setFetchedPrograms(res.data);
        console.log(res.data)
        setLoading(false);
    })
      }

    useEffect(() => {
        setLoading(true);
        fetchData();

  
    }, [])

  const [isModal, setModal] = useState(false);
  const [isErrorModal, setErrorModal] = useState(false);

    // States for inputs
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    const [limit, setLimit] = useState(0);
    const [programId, setProgramId] = useState(0)

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch(name) {
      case 'dateInput':
        setDate(value);
        break;
      case 'hourInput':
        setHour(value);
        break;
      case 'limit':
        setLimit(value);
        break;
      case 'programId':
        setProgramId(event.target.selectedOptions[0].getAttribute('data-id'));
        break;
    }
  }


  const handleSubmit = (e) => {
      const data = {
          date, hour, limit, programId
        }
        console.log(data)


    axios({
      method: 'post',
      url: '/booking/post',
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
    <Sidebar activeBook/>


    <div>
      <Modal
        open={isModal}
        onClose={() => {setModal(false); setErrorModal(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {!isErrorModal ? <p style={{color: 'green'}}>Successfully added booking!</p> : <p style={{color: 'red'}}>Connection lost! Try again</p>}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>


    <div className="newProduct">
      <h1 className="addProductTitle">New booking</h1>
      <form className="addProductForm">

      <div className="addProductItem">
          <label>Date</label>
          <input type="date" onBlur={handleChange} id="dateInput" name="dateInput" placeholder="Date.." required/>
        </div>

        <div className="addProductItem">
          <label>Hour</label>
          <input type="time" onBlur={handleChange} id="hourInput" name="hourInput" placeholder="Hour.." required/>
        </div>

        <div className="addProductItem">
          <label>Limit</label>
          <input type="number" onBlur={handleChange} id="limit" name="limit" placeholder="Limit of reservations.." required/>
        </div>

        <div className="addProductItem">
            <label>Program</label>
            <select name="programId" id="programId" onChange={handleChange}>
                <option disabled selected id="optionProgram">-- Choose program --</option>
                {fetchedPrograms.map((el) => {
                    return <SelectItem key={el.programId} id={el.programId} name={el.header}/>
                })}
            </select>
        </div>

        <button className="addProductButton" onClick={handleSubmit}>New post </button>
      </form>
    </div>
    </div>
    </div>
  );
}

const SelectItem = props => {
    return (
        <option data-id={props.id}> ID: {props.id}, Header: {props.name} </option>
    )
}

export default NewBook;