import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { firebaseAuth } from '../provider/AuthProvider';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const Profile = ({ signout }) => {
  const classes = useStyles();

  return (
    <div>
      <div className="profile-container">
        <Typography variant="h5" style={{ marginBottom: '10px' }}>
          Logged in as:
        </Typography>
        <Avatar
          className={classes.large}
          alt="Travis Howard"
          src="/static/images/avatar/2.jpg"
        />
        <Typography variant="h6" style={{ marginTop: '10px' }}>
          Username Surname
        </Typography>
        <Typography variant="subtitle1" style={{ marginTop: '5px' }}>
          @Username
        </Typography>
        <button onClick={signout}>sign out </button>
      </div>
    </div>
  );
};

export default Profile;
