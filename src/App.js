import './App.css';
import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { firebaseAuth } from './provider/AuthProvider';
import Twitter from './components/Twitter';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appContainer: {
    height: '100vh',
  },
}));

function App() {
  const classes = useStyles();

  const { handleSignup } = useContext(firebaseAuth);
  console.log(handleSignup);

  const { token } = useContext(firebaseAuth);
  console.log(token);

  return (
    <>
      <Switch>
        {/* route allows you to render by url path */}

        <Route
          exact
          path="/"
          render={(rProps) => (token === null ? <Signin /> : <Twitter />)}
        />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
      {/* <Twitter /> */}
    </>
  );
}

export default App;
