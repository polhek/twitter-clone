import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { logOut } from '../firebase/firebaseIndex';
import { UserContext } from '../provider/UserProvider';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const { displayName, email, photoURL, handle } = user;
  const signOut = () => {
    history.push('/');
    logOut();
  };

  return (
    <div>
      <div className="profile-container">
        <Typography variant="h5" style={{ marginBottom: '10px' }}>
          Logged in as:
        </Typography>
        <Avatar className={classes.large} alt={displayName} src={photoURL} />
        <Typography variant="h6" style={{ marginTop: '10px' }}>
          {displayName}
        </Typography>
        <Typography variant="subtitle1" style={{ marginTop: '5px' }}>
          @{handle}
        </Typography>
        <button onClick={signOut}>sign out </button>
      </div>
    </div>
  );
};

export default Profile;
