import React, { useContext } from 'react';
import SidebarItem from './SidebarItem';
import ProfileIcon from './ProfileIcon';
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmailIcon from '@material-ui/icons/Email';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListIcon from '@material-ui/icons/List';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../provider/UserProvider';

const Sidebar = () => {
  const user = useContext(UserContext);
  return (
    <div className="sidebarContainer">
      <div className="sidebarItems">
        <TwitterIcon fontSize="large" />
        <SidebarItem text="Home" Icon={HomeIcon} />
        <SidebarItem text="Explore" Icon={SearchIcon} />
        <SidebarItem text="Notifications" Icon={NotificationsIcon} />
        <SidebarItem text="Messages" Icon={EmailIcon} />
        <SidebarItem text="Bookmarks" Icon={BookmarkBorderIcon} />
        <SidebarItem text="Messages" Icon={EmailIcon} />
        <SidebarItem text="Lists" Icon={ListIcon} />
        <SidebarItem text="Profile" Icon={PersonOutlineIcon} />
        <SidebarItem text="More" Icon={MoreHorizIcon} />
        <button className="tweet-button">
          <Typography variant="h6" fontWeight="fontWeightBold">
            Tweet
          </Typography>
        </button>
      </div>
      {user && <ProfileIcon />}
    </div>
  );
};

export default Sidebar;
