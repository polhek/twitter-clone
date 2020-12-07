import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import Typography from '@material-ui/core/Typography';

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

//!! pogruntaj kak bi se in
const NewTweet = () => {
  const classes = useStyles();
  return (
    <div className="newTweetContainer">
      <div className="newTweetForm">
        <Avatar
          className={classes.large}
          alt="Travis Howard"
          src="/static/images/avatar/2.jpg"
          style={{ marginLeft: '10px' }}
        />
        <form>
          <TextareaAutosize
            rowsMax={10}
            aria-label="maximum height"
            placeholder="What's happening?"
            defaultValue=""
            className={classes.textArea}
            inputprops={{ maxLength: 10 }}
          />
        </form>
      </div>
      <div className="tweetOptions">
        <div className="addItems">
          <ImageIcon className="addIcon" />
          <GifIcon className="addIcon" style={{ marginLeft: '10px' }} />
        </div>
        <button className="tweet-buttonMain">
          <Typography fontWeight="fontWeightBold">Tweet</Typography>
        </button>
      </div>
    </div>
  );
};

export default NewTweet;
