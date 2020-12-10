import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../provider/UserProvider';
import { Redirect } from 'react-router-dom';
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
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    console.log(user);
    if (!user) {
      setredirect('/');
    }
  }, [user]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <Grid
      container
      justify="center"
      className={classes.appContainer}
      spacing={0}
    >
      <Grid item sm={3} xs={3} height="100vh">
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
        {user && <Profile />}
      </Grid>
    </Grid>
  );
};

export default Twitter;
