import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  RouteProps
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";

import { LandingPage } from "../LandingPage";
import { GroupsPage } from "../GroupsPage";
import { ChatPage } from "../ChatPage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const AuthenticatedRoute: React.FC<RouteProps> = props => {
  const [user, initialising] = useAuthState(firebase.auth());
  if (initialising) {
    return null;
  }

  if (user) {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <AuthenticatedRoute path="/chat/:id">
          <ChatPage />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/groups">
          <GroupsPage />
        </AuthenticatedRoute>
      </Switch>
    </Router>
  );
};

export { App };
