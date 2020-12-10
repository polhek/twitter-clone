import React, { useState, useEffect, createContext } from 'react';
import { auth } from '../firebase/firebaseIndex';

export const UserContext = createContext({ user: null });

const getHandle = (userObjName) => {
  let n = userObjName.split(' ');
  let lWord = n[n.length - 1];
  return lWord;
};

export default (props) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, email, photoURL } = user;

        setUserInfo({
          displayName: displayName,
          email: email,
          photoURL: photoURL,
          handle: getHandle(displayName),
        });
      } else if (!user) {
        setUserInfo(null);
      }
    });
  }, []);
  return (
    <UserContext.Provider value={userInfo}>
      {props.children}
    </UserContext.Provider>
  );
};
