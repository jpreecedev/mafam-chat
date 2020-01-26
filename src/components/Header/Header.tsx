import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/mafam-logo.png";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <Link to="/">
      <header>
        <img src={logo} alt="MaFam.chat" className={styles.logo} />
      </header>
    </Link>
  );
};

export { Header };
