import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import dotenv from 'dotenv';
dotenv.config();

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  googleProvider.addScope('email');
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      // user object
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
export const logOut = () => {
  auth
    .signOut()
    .then(() => {
      console.log('logged out');
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const db = firebase.firestore();
