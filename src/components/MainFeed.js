import React from 'react';
import Typography from '@material-ui/core/Typography';
import NewTweet from './NewTweet';
import TweetFeed from './TweetFeed';

const MainFeed = () => {
  return (
    <div className="mainFeed">
      <div className="topHome">
        <Typography
          variant="h6"
          style={{ marginTop: '10px', marginLeft: '10px', fontWeight: 'bold' }}
        >
          Home
        </Typography>
      </div>
      <div className="mTweetFeed">
        <NewTweet />
        <div>
          <TweetFeed />
          <TweetFeed />
          <TweetFeed />
          <TweetFeed />
          <TweetFeed />
        </div>
      </div>
    </div>
  );
};

export default MainFeed;
