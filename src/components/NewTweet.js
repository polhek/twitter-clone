import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ImageIcon from '@material-ui/icons/Image';
import { Fab } from '@material-ui/core';
import { db, storage } from '../firebase/firebaseIndex';
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../provider/UserProvider';

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
  const [photo, setPhoto] = useState(null);
  const classes = useStyles();

  const handleSubmit = (event) => {
    if (tweet.length > 0) {
      event.preventDefault();
      if (photo === null) {
        saveTweetFirestore(displayName, handle, tweet, photoURL);
      } else {
        onUploadImage();
      }
      setPhoto(null);
      setTweet('');
    }
  };

  const onFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const onUploadImage = async () => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(photo.name);
    await fileRef.put(photo);
    saveTweetWithImage(displayName, handle, tweet, photoURL, photo, fileRef);
  };

  const saveTweetWithImage = async (
    displayName,
    handle,
    tweet,
    photoURL,
    photo,
    fileRef
  ) => {
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
        imageURL: await fileRef.getDownloadURL(),
      })
      .then(() => {
        console.log('Successfully saved tweet info');
      })
      .catch((error) => {
        console.log('Error saving tweet info', error);
      });
  };

  const saveTweetFirestore = (displayName, handle, tweet, photoURL) => {
    db.collection('allTweets')
      .doc(tweet)
      .set({
        id: tweet,
        displayName: displayName,
        handle: handle,
        tweet: tweet,
        photoLink: photoURL,
        likes: 0,
        timestamp: Date.now(),
        likedBy: [],
        imageURL: null,
        comments: [],
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
            <label htmlFor="upload-photo">
              <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={onFileChange}
              />
              <Fab
                color="primary"
                size="small"
                component="span"
                aria-label="add"
              >
                <ImageIcon />
              </Fab>
            </label>
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
