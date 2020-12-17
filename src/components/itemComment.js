import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const ItemComment = ({ item }) => {
  return (
    <div className="comment">
      <Avatar src={item.avatar} alt={item.avatar} style={{ margin: '10px' }} />
      <Typography>{item.comment}</Typography>
    </div>
  );
};

export default ItemComment;
