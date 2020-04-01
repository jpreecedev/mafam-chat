import React from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuthState } from "react-firebase-hooks/auth";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/groups",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

const SignIn: React.FC = () => {
  const [user, initialising] = useAuthState(firebase.auth());

  if (initialising) {
    return null;
  }

  return (
    <>
      {!user && (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
      {user && <Redirect to="/groups" />}
    </>
  );
};

export { SignIn };
