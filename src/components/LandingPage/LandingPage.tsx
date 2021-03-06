import React from "react";

import { DefaultLayout } from "../../layout";
import { SignIn } from "../SignIn";

import logo from "../../assets/mafam-logo.png";
import styles from "./styles.module.css";

const LandingPage: React.FC = () => {
  return (
    <DefaultLayout>
      <header className={styles.header}>
        <div>
          <img src={logo} className={styles.logo} alt="MaFam.chat" />
          <h2>
            An easy way to chat
            <br />
            with your friends and family.
          </h2>
        </div>
      </header>
      <main className={styles.main}>
        <SignIn />
      </main>
    </DefaultLayout>
  );
};

export { LandingPage };
