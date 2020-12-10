import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { db } from '../firebase/firebaseIndex';

const TweetFeed = ({
  displayName,
  handle,
  likes,
  photo,
  tweetText,
  likedBy,
}) => {
  const [liked, setLiked] = useState(false);
  const [whoLiked, setWhoLiked] = useState(likedBy);
  const [firstMount, setFirstMount] = useState(true);

  const likeTweet = () => {
    if (liked === false && whoLiked.includes(displayName) === false) {
      setLiked(true);
      setWhoLiked(whoLiked.concat(displayName));
    }
  };
  useEffect(() => {
    if (whoLiked.includes(displayName) === true) setLiked(true);
  }, [whoLiked]);

  useEffect(() => {
    if (whoLiked.includes(displayName) === true && firstMount === false) {
      updateWhoLiked();
    }
    setFirstMount(false);
  }, [whoLiked]);

  const updateWhoLiked = () => {
    let ref = db.collection('allTweets').doc(tweetText);
    return ref
      .update({
        likedBy: whoLiked,
      })
      .then(function () {
        console.log('Document successfully updated!');
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };

  return (
    <div className="tweet">
      <div className="tweetText">
        <Avatar style={{ marginLeft: '10px' }} alt={displayName} src={photo} />
        <div style={{ marginLeft: '5px' }}>
          <Typography fontWeight="fontWeightBold">
            <b>{displayName}</b> @{handle}
          </Typography>
          <Typography style={{ marginBottom: '15px' }}>{tweetText}</Typography>
        </div>
      </div>
      <div className="tweetOptionsBottom">
        <IconButton className="tweetIcon" style={{ color: 'white' }}>
          {' '}
          <CommentIcon />
        </IconButton>
        <IconButton
          aria-label="share"
          className="tweetIcon"
          style={{ marginLeft: '30px', color: 'white' }}
        >
          <ShareIcon />
        </IconButton>
        <IconButton
          aria-label="favorite"
          className="tweetIcon"
          style={{ marginLeft: '30px', color: 'white' }}
          onClick={likeTweet}
        ></IconButton>
        <IconButton
          aria-label="favorite"
          className="tweetIcon"
          style={
            liked
              ? { marginLeft: '30px', color: 'red' }
              : { marginLeft: '30px', color: 'white' }
          }
          onClick={likeTweet}
        >
          <FavoriteBorderIcon />
          {whoLiked.length}
        </IconButton>
      </div>
    </div>
  );
};

export default TweetFeed;
