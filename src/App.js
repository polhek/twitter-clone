import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from 'react-router-dom';
import Signin from './components/Signin';
import Twitter from './components/Twitter';
import { makeStyles } from '@material-ui/core/styles';
import UserProvider from './provider/UserProvider';

const useStyles = makeStyles((theme) => ({
  appContainer: {
    height: '100vh',
  },
}));

function App() {
  return (
    <UserProvider basename="/">
      <HashRouter>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Signin />
            </Route>
            <Route exact path="/twitter">
              <Twitter />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    </UserProvider>
  );
}

export default App;
