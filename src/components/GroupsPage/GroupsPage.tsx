import React from "react";
import { useHistory } from "react-router-dom";

import { TitleLayout } from "../../layout";
import { GroupSummaryItem } from "../GroupSummaryItem";
import { CreateGroupButton } from "../CreateGroupButton";
import styles from "./styles.module.css";
import { useFirebaseChatGroup } from "../../hooks";
import defaultAvatar from "../../assets/default_avatar.png";

const GroupsPage = () => {
  const history = useHistory();
  const groups = useFirebaseChatGroup();

  const renderGroups = () =>
    groups.map((group, index) => (
      <div className={styles[index % 2 === 0 ? "even" : "odd"]} key={group.key}>
        <GroupSummaryItem
          id={group.key}
          avatar={group.lastMessage.avatar || defaultAvatar}
          name={group.name}
          time={new Date()}
          message={group.lastMessage}
          onSelected={() => history.push(`/chat/${group.key}`)}
        />
      </div>
    ));

  const renderNoGroups = () => {
    return (
      groups.length === 0 && (
        <p className={styles.noGroups}>There are no groups at the minute.</p>
      )
    );
  };

  return (
    <TitleLayout title="Your Groups" titleClasses={styles.padded}>
      {renderGroups()}
      {renderNoGroups()}
      <CreateGroupButton />
    </TitleLayout>
  );
};

export { GroupsPage };
