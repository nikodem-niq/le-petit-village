import "./userList.css";
import axios from 'axios';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from "../../utils/config";


export default function UserList() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [isModal, setModal] = useState(false);
  const [isErrorModal, setErrorModal] = useState(false);

  const handleDelete = (id) => {
    axios({
      method: 'post',
      url: '/user/delete',
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

  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: 'get',
        url: `/user/fetch`,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : localStorage.getItem('userToken')
        },
    }).then(res => {
      setData(res.data.rows);
    }).catch(err => {
      console.log(err);
    })
    }

    fetchData().then(() => {
      setLoading(false);
    })

  }, [isLoading])
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "login",
      headerName: "Login",
      width: 200,
      // renderCell: (params) => {
      //   return (
      //     <div className="userListUser">
      //       <img className="userListImg" src={params.row.avatar} alt="" />
      //       {params.row.username}
      //     </div>
      //   );
      // },
    },
    { field: "password", headerName: "Password (Hashed)", width: 350 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
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
            {!isErrorModal ? <p style={{color: 'green'}}>Successfully <b>DELETED</b> user!</p> : <p style={{color: 'red'}}>Connection lost! Try again</p>}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>

    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={12}
        checkboxSelection
      />
    </div>
    </div>
    </div>
  );
}
