import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const TweetFeed = () => {
  return (
    <div className="tweet">
      <div className="tweetText">
        <Avatar
          style={{ marginLeft: '10px' }}
          alt="Travis Howard"
          src="/static/images/avatar/2.jpg"
        />
        <div style={{ marginLeft: '5px' }}>
          <Typography fontWeight="fontWeightBold">
            <b>Žiga Grošelj</b> @polhek
          </Typography>
          <Typography style={{ marginBottom: '15px' }}>
            sadmasmdsamdsmadsmdsamdsamsadmadsmdasmdsamdsadsafds dsfasjfdsajfdsa
            dfsa fds dfsa dfas fds fdsfds
          </Typography>
        </div>
      </div>
      <div className="tweetOptionsBottom">
        <CommentIcon className="tweetIcon" />
        <ShareIcon className="tweetIcon" style={{ marginLeft: '30px' }} />
        <FavoriteBorderIcon
          className="tweetIcon"
          style={{ marginLeft: '30px' }}
        />
      </div>
    </div>
  );
};

export default TweetFeed;
