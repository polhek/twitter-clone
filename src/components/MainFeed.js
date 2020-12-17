import React, { useContext, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import NewTweet from './NewTweet';
import TweetFeed from './TweetFeed';
import { UserContext } from '../provider/UserProvider';
import { db } from '../firebase/firebaseIndex';
import uniqid from 'uniqid';

const MainFeed = () => {
  const user = useContext(UserContext);
  const [allTweets, setAllTweets] = useState([]);

  useEffect(() => {
    getTweets();
  }, []);

  const getTweets = () => {
    db.collection('allTweets')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        (snapshot) => {
          setAllTweets(
            snapshot.docs.map((doc) => {
              return doc.data();
            })
          );
        },
        function (error) {
          console.log(error);
        }
      );
  };

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
        {user && <NewTweet />}
        <div style={{ overflow: 'auto', height: '90vh' }}>
          {allTweets.map((tweet) => {
            return (
              <TweetFeed
                key={uniqid()}
                id={tweet.id}
                tweet={tweet}
                displayName={tweet.displayName}
                handle={tweet.handle}
                likes={tweet.likes}
                photo={tweet.photoLink}
                tweetText={tweet.tweet}
                likedBy={tweet.likedBy}
                image={tweet.imageURL}
                allComments={tweet.comments}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainFeed;
