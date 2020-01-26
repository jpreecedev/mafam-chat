import React from "react";
import firebase from "firebase/app";

import { USERS_REF } from "../constants";

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
      });

    return () => {
      unregisterAuthObserver();
    };
  }, [firebaseApp]);

  return user;
};

export { useFirebaseAuth };
