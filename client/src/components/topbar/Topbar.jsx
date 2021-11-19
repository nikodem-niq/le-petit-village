import React from "react";
import "./topbar.css";
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { logoutUser } from "../../middlewares/auth";


export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Aurora Counselling Dashboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Tooltip title="Log out">
              <LogoutIcon onClick={() => {logoutUser()}}/>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
