import React from "react";
import firebase from "firebase/app";

import { USERS_REF } from "../constants";

const requestPermissionForNotifications = (onGranted: Function) => {
  firebase
    .messaging()
    .requestPermission()
    .then(function() {
      onGranted();
    });
};

const updateToken = () => {
  firebase
    .messaging()
    .getToken()
    .then(function(currentToken) {
      if (firebase.auth().currentUser?.uid && currentToken) {
        firebase
          .database()
          .ref(
            `users/${
              firebase.auth().currentUser?.uid
            }/notificationTokens/currentToken`
          )
          .set(true);
      }
    });
};

const useFirebaseAuth = (firebaseApp: firebase.app.App | any) => {
  const [user, setUser] = React.useState<firebase.User | null>(null);

  React.useEffect(() => {
    const unregisterAuthObserver = firebaseApp
      .auth()
      .onAuthStateChanged(firebaseUser => {
        if (!firebaseUser) {
          setUser(null);
          return;
        }

        setUser(firebaseUser);

        firebaseApp
          .database()
          .ref(USERS_REF)
          .child(firebaseUser.uid)
          .set(firebaseUser.providerData[0]);

        requestPermissionForNotifications(() => {
          updateToken();
        });
      });

    return () => {
      unregisterAuthObserver();
    };
  }, [firebaseApp]);

  return user;
};

export { useFirebaseAuth };
