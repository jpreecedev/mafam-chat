import React from "react";

import { Header } from "../../components/Header";

interface TitleLayoutProps {
  title: string;
  titleClasses?: string;
  mainClasses?: string;
}

const TitleLayout: React.FunctionComponent<TitleLayoutProps> = ({
  title,
  children,
  titleClasses,
  mainClasses
}) => (
  <>
    <Header />
    <main className={mainClasses}>
      <h2 className={titleClasses}>{title}</h2>
      {children}
    </main>
  </>
);

export { TitleLayout };
