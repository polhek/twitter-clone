import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const ProfileIcon = () => {
  return (
    <div className="sidebar-profile">
      <div className="sideber-name_profile">
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <div style={{ marginLeft: '5px' }}>
          <Typography fontWeight="fontWeightBold">
            <b>Žiga Grošelj</b>
          </Typography>
          <Typography>@polhek</Typography>
        </div>
      </div>
      <div>
        <MoreHorizIcon style={{ marginRight: '15px' }}></MoreHorizIcon>
      </div>
    </div>
  );
};

export default ProfileIcon;
