import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/dashboard",
  signInOptions: [
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

interface SignInProps {
  user: firebase.User | null;
}

const SignIn: FunctionComponent<SignInProps> = ({ user }) => (
  <>
    {!user && (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    )}
    {user && (
      <>
        <Link to="/groups" className="button">
          Take me to ma fam
        </Link>
        <Link
          to="#"
          className="button secondary"
          onClick={() => firebase.auth().signOut()}
        >
          Log me out
        </Link>
      </>
    )}
  </>
);

export { SignIn };
