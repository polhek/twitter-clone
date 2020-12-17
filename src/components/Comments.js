import React, { useContext, useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { UserContext } from '../provider/UserProvider';
import { db } from '../firebase/firebaseIndex';
import ItemComment from './itemComment';

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

const Comments = ({ id, allComments }) => {
  const [comment, setComment] = useState('');
  const [allCommentsData, setAllComments] = useState(allComments);
  const classes = useStyles();
  const user = useContext(UserContext);
  const userAvatar = user.photoURL;

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllComments([...allComments, { comment: comment, avatar: userAvatar }]);
    setComment('');
  };

  useEffect(() => {
    saveCommentToDB(id, allCommentsData);
  }, [allCommentsData]);

  const saveCommentToDB = (id, allComments) => {
    let ref = db.collection('allTweets').doc(id);

    return ref
      .update({
        comments: allCommentsData,
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
    <div>
      {allCommentsData.map((item) => {
        return <ItemComment item={item} />;
      })}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="newTweetForm">
          <Avatar
            className={classes.large}
            src={user.photoURL}
            alt={user.displayName}
            style={{ marginLeft: '10px' }}
          />

          <TextareaAutosize
            rowsMax={10}
            aria-label="maximum height"
            placeholder="Insert your comment?"
            className={classes.textArea}
            inputprops={{ maxLength: 10 }}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button type="submit" className="tweet-buttonMain">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
