import React from 'react';
import Typography from '@material-ui/core/Typography';

const SidebarItem = ({ Icon, text }) => {
  return (
    <div className="sidebar-item">
      <Icon fontSize="large" />
      <Typography
        variant="h6"
        fontWeight="fontWeightBold"
        style={{ marginLeft: '12px' }}
      >
        {text}
      </Typography>
    </div>
  );
};

export default SidebarItem;
