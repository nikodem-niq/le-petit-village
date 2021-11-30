import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import moment from 'moment';



const BooksList = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [isModal, setModal] = useState(false);
  const [isErrorModal, setErrorModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: 'get',
        url: `/booking/fetch`,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : localStorage.getItem('userToken')
        },
    }).then(res => {
      res.data.map((row) => {
        row['id'] = row.bookId;
        row['date'] = moment(row['date']).format('LL')
      })
      setData(res.data);
      console.log(data);
    }).catch(err => {
      console.log(err);
    })
    }

    fetchData().then(() => {
      setLoading(false);
    })

  }, [isLoading])

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const handleDelete = (id) => {
    axios({
      method: 'post',
      url: '/booking/delete',
      headers: {
          'Content-Type': 'application/json',
          'x-access-token' : localStorage.getItem('userToken')
      },
      data : {id}
    }).then(res => {
      if(res.status === 200 || res.status === '200') {
        setModal(true);
        setData(data.filter((item) => item.id !== id));
      }
    }).catch(err => {
      setErrorModal(true)
      setModal(true);
    })
  };


  const columns = [
    { field: "bookId", headerName: "Book ID", width: 150 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "hour",
      headerName: "Hour",
      width: 150,
    },
    { field: "currentlyReservated", headerName: "Currently reservated", width: 150 },
    { field: "limit", headerName: "Limit", width: 150 },
    {
      field: "programId",
      headerName: "Which program? (Its ID)",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/booking/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
    <Topbar/>
    <div style={{display: 'flex'}}>
    <Sidebar activeBookList/>
    <div className="productList">

    <div>
      <Modal
        open={isModal}
        onClose={() => {setModal(false); setErrorModal(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {!isErrorModal ? <p style={{color: 'green'}}>Successfully <b>DELETED</b> book!</p> : <p style={{color: 'red'}}>Connection lost! Try again</p>}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>

      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={12}
        // checkboxSelection
        loading={isLoading}
      />
    </div>
    </div>
    </div>
  );
}

export default BooksList;