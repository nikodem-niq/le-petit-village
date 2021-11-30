import "./sidebar.css";
import {
  PermIdentity,
} from "@material-ui/icons";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ArticleIcon from '@mui/icons-material/Article';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import BookIcon from '@mui/icons-material/Book';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { Link } from "react-router-dom";

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>

          <ul className="sidebarList">
            <Link to="/admin" className="link">
            <li className={`sidebarListItem ${props.activeDashboard ? 'active' : ''}`}>
              <DashboardIcon className="sidebarIcon" />
              Dashboard
            </li>
            </Link>
          </ul>

          <h3 className="sidebarTitle">Programs</h3>
          <ul className="sidebarList">
            <Link to="/programs" className="link">
            <li className={`sidebarListItem ${props.activePostsList ? 'active' : ''}`}>
              <ArticleIcon className="sidebarIcon" />
              Programs
            </li>
            </Link>

            <Link to="/new-program" className="link">
            <li className={`sidebarListItem ${props.activePosts ? 'active' : ''}`}>
              <PostAddIcon className="sidebarIcon" />
              New program
            </li>
            </Link>
          </ul>

          <h3 className="sidebarTitle">Booking</h3>
          <ul className="sidebarList">
            <Link to="/books" className="link">
            <li className={`sidebarListItem ${props.activeBookList ? 'active' : ''}`}>
              <BookIcon className="sidebarIcon" />
              Books
            </li>
            </Link>

            <Link to="/new-book" className="link">
            <li className={`sidebarListItem ${props.activeBook ? 'active' : ''}`}>
              <BookOnlineIcon className="sidebarIcon" />
              New book
            </li>
            </Link>
          </ul>

          <h3 className="sidebarTitle">Reservations</h3>
          <ul className="sidebarList">
            <Link to="/reservations" className="link">
            <li className={`sidebarListItem ${props.activeReservations ? 'active' : ''}`}>
              <PeopleAltIcon className="sidebarIcon" />
              List of reservations
            </li>
            </Link>
          </ul>

          <h3 className="sidebarTitle">Users</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className={`sidebarListItem ${props.activeUsers ? 'active' : ''}`}>
                <PermIdentity className="sidebarIcon"/>
                Users
              </li>
            </Link>

            <Link to="/new-user" className="link">
              <li className={`sidebarListItem ${props.activeUser ? 'active' : ''}`}>
                <GroupAddIcon className="sidebarIcon"/>
                New user
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
