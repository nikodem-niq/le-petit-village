import "./sidebar.css";
import {
  PermIdentity,
} from "@material-ui/icons";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ArticleIcon from '@mui/icons-material/Article';
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


            <Link to="/posts" className="link">
            <li className={`sidebarListItem ${props.activePostsList ? 'active' : ''}`}>
              <ArticleIcon className="sidebarIcon" />
              Posts
            </li>
            </Link>

            <Link to="/new-post" className="link">
            <li className={`sidebarListItem ${props.activePosts ? 'active' : ''}`}>
              <PostAddIcon className="sidebarIcon" />
              New post
            </li>
            </Link>

            <Link to="/users" className="link">
              <li className={`sidebarListItem ${props.activeUsers ? 'active' : ''}`}>
                <PermIdentity className="sidebarIcon"/>
                Users
              </li>
            </Link>
            </ul>
        </div>
      </div>
    </div>
  );
}
