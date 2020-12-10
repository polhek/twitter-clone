import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { UserContext } from '../provider/UserProvider';

const ProfileIcon = () => {
  const user = useContext(UserContext);
  const { displayName, email, photoURL, handle } = user;
  return (
    <div className="sidebar-profile">
      <div className="sideber-name_profile">
        <Avatar alt={displayName} src={photoURL} />
        <div style={{ marginLeft: '5px' }}>
          <Typography fontWeight="fontWeightBold">
            <b>{displayName}</b>
          </Typography>
          <Typography>@{handle}</Typography>
        </div>
      </div>
      <div>
        <MoreHorizIcon style={{ marginRight: '15px' }}></MoreHorizIcon>
      </div>
    </div>
  );
};

export default ProfileIcon;
