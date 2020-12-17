import React, { useState, useEffect, useContext } from 'react';
import Comments from './Comments';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { UserContext } from '../provider/UserProvider';
import { db } from '../firebase/firebaseIndex';

const TweetFeed = ({
  id,
  tweet,
  displayName,
  handle,
  likes,
  photo,
  tweetText,
  likedBy,
  image,
  allComments,
}) => {
  const user = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [whoLiked, setWhoLiked] = useState(likedBy);
  const [firstMount, setFirstMount] = useState(true);
  const [commentsVisible, setCommentsVisible] = useState(false);

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
    let ref = db.collection('allTweets').doc(id);
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

  const retweet = (
    id,
    user,
    displayName,
    tweetText,
    handle,
    tweet,
    photo,
    image
  ) => {
    db.collection('allTweets')
      .doc(`${id}${user.displayName}retweet`)
      .set({
        id: `${id}${user.displayName}retweet`,
        retweetPerson: user.displayName,
        retweetPhoto: user.photoURL,
        retweetHandle: user.handle,
        displayName: displayName,
        handle: handle,
        photoLink: photo,
        tweet: tweetText,
        likes: 0,
        timestamp: Date.now(),
        likedBy: [],
        imageURL: image,
        comments: [],
      })
      .then(() => {
        console.log('Successfully saved tweet info');
      })
      .catch((error) => {
        console.log('Error saving tweet info', error);
      });
  };

  const seeComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  return (
    <div className="tweet">
      {tweet.retweetPerson && (
        <div className="retweet">
          <Typography style={{ marginLeft: '15px' }} fontStyle="italic">
            Retweeted by:
          </Typography>

          <Avatar
            style={{ marginLeft: '10px' }}
            alt={tweet.retweetPerson}
            src={tweet.retweetPhoto}
          />
          <Typography
            style={{ marginLeft: '15px' }}
            fontWeight="fontWeightBold"
          >
            <b>{tweet.retweetPerson}</b> @{tweet.retweetHandle}
          </Typography>
        </div>
      )}
      <div className="tweetText">
        <Avatar style={{ marginLeft: '10px' }} alt={displayName} src={photo} />
        <div style={{ marginLeft: '5px' }}>
          <Typography fontWeight="fontWeightBold">
            <b>{displayName}</b> @{handle}
          </Typography>
          <Typography style={{ marginBottom: '15px' }}>{tweetText}</Typography>
          {image && (
            <img
              className="tweetImage"
              src={image}
              alt={image}
              style={{ height: '200px' }}
            ></img>
          )}
        </div>
      </div>
      <div className="tweetOptionsBottom">
        <IconButton
          onClick={seeComments}
          className="tweetIcon"
          style={{ color: 'white' }}
        >
          <CommentIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            retweet(
              id,
              user,
              displayName,
              tweetText,
              handle,
              tweet,
              photo,
              image
            );
          }}
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
      {commentsVisible && <Comments id={id} allComments={allComments} />}
    </div>
  );
};

export default TweetFeed;
