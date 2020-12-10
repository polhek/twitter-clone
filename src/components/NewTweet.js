import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../provider/UserProvider';
import { db } from '../firebase/firebaseIndex';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  textArea: {
    width: '100%',
    background: 'none',
    border: 'none',
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 20,
  },
}));

const NewTweet = () => {
  const user = useContext(UserContext);
  const { displayName, photoURL, handle } = user;
  const [tweet, setTweet] = useState('');
  const classes = useStyles();

  const handleSubmit = (event) => {
    if (tweet.length > 0) {
      event.preventDefault();
      saveTweetFirestore(displayName, handle, tweet, photoURL);
      setTweet('');
    }
  };

  const saveTweetFirestore = (displayName, handle, tweet, photoURL) => {
    db.collection('allTweets')
      .doc(tweet)
      .set({
        displayName: displayName,
        handle: handle,
        tweet: tweet,
        photoLink: photoURL,
        likes: 0,
        timestamp: Date.now(),
        likedBy: [],
      })
      .then(() => {
        console.log('Successfully saved tweet info');
      })
      .catch((error) => {
        console.log('Error saving tweet info', error);
      });
  };

  return (
    <div className="newTweetContainer">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="newTweetForm">
          <Avatar
            className={classes.large}
            alt={displayName}
            src={photoURL}
            style={{ marginLeft: '10px' }}
          />

          <TextareaAutosize
            rowsMax={10}
            aria-label="maximum height"
            placeholder="What's happening?"
            value={tweet}
            onChange={(e) => {
              setTweet(e.target.value);
            }}
            className={classes.textArea}
            inputprops={{ maxLength: 10 }}
          />
        </div>
        <div className="tweetOptions" style={{ marginTop: '10px' }}>
          <div className="addItems">
            <ImageIcon className="addIcon" />
            <GifIcon className="addIcon" style={{ marginLeft: '10px' }} />
          </div>
          <button type="submit" className="tweet-buttonMain">
            <Typography fontWeight="fontWeightBold">Tweet</Typography>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTweet;
