import React, { useContext } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Sidebar from './Sidebar';
import MainFeed from './MainFeed';
import Profile from './Profile';

const useStyles = makeStyles((theme) => ({
  appContainer: {
    height: '100vh',
  },
}));

const Twitter = () => {
  const classes = useStyles();

  const { handleSignout } = useContext(firebaseAuth);
  return (
    <Grid
      container
      justify="center"
      className={classes.appContainer}
      spacing={0}
    >
      <Grid item sm={3} xs={3} height="100vh">
        <button onClick={handleSignout}>sign out </button>
        <Sidebar />
      </Grid>
      <Grid item xs={6} height="100vh">
        <MainFeed />
      </Grid>
      <Grid
        item
        container
        xs={3}
        height="100vh"
        alignItems="center"
        justify="center"
        className="rightGrid"
      >
        <Profile signout={handleSignout} />
      </Grid>
    </Grid>
  );
};

export default Twitter;
