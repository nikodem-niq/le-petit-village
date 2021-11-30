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
import { modalStyle } from "../../utils/config";

const Reservations = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [isModal, setModal] = useState(false);
  const [isErrorModal, setErrorModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: 'get',
        url: `/reservations/fetch`,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : localStorage.getItem('userToken')
        },
    }).then(res => {
      res.data.map((row) => {
        row['id'] = row.reservationId;
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

  const handleDelete = (id) => {
    axios({
      method: 'post',
      url: '/reservations/delete',
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
    { field: "reservationId", headerName: "Reservation ID", width: 150 },
    {
      field: "bookId",
      headerName: "Book ID",
      width: 150,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 150,
    },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "howManyChildren",
      headerName: "How many children",
      width: 250,
    },
    { field: "nameOfChildren", headerName: "Name of children", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/reservations/" + params.row.id}>
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
    <Sidebar activeReservations/>
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
            {!isErrorModal ? <p style={{color: 'green'}}>Successfully <b>DELETED</b> reservation!</p> : <p style={{color: 'red'}}>Connection lost! Try again</p>}
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

export default Reservations;