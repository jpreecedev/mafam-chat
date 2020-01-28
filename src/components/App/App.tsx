import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";

import { useFirebaseAuth } from "../../hooks";
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

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

const App = () => {
  const user = useFirebaseAuth(firebaseApp);

  return (
    <Router>
      <Switch>
        <Route path="/chat/:id">
          <ChatPage />
        </Route>
        <Route path="/groups">
          <GroupsPage />
        </Route>
        <Route path="/">
          <LandingPage user={user} />
        </Route>
      </Switch>
    </Router>
  );
};

export { App };
