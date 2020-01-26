import React from "react";
import firebase from "firebase/app";

import { Group } from "../types";
import { CHATS_REF } from "../constants";

const useFirebaseChatGroup = () => {
  const [groups, setGroups] = React.useState<Group[]>([]);

  React.useEffect(() => {
    firebase
      .database()
      .ref(CHATS_REF)
      .on("value", snapshot => {
        const val = snapshot.val();
        if (!val) {
          setGroups([]);
          return;
        }

        const groups = Object.keys(val).map<Group>(key => ({
          key,
          created: new Date(val[key].created),
          name: val[key].name,
          messages: val[key].messages || [],
          lastMessage:
            val[key].messages && val[key].messages.length > -1
              ? val[key].messages[val[key].messages.length - 1]
              : null
        }));

        setGroups(groups);
      });
  }, []);

  return groups;
};

const useFirebaseChatGroupById = (id: string) => {
  const [group, setGroup] = React.useState<Group | null>(null);

  React.useEffect(() => {
    firebase
      .database()
      .ref(CHATS_REF)
      .child(id)
      .on("value", snapshot => {
        const val = snapshot.val();
        if (!val) {
          setGroup(null);
          return;
        }
        setGroup({
          key: id,
          created: new Date(val.created),
          name: val.name,
          messages: val.messages || [],
          lastMessage:
            val.messages && val.messages.length > -1
              ? val.messages[val.messages.length - 1]
              : null
        });
      });
  }, [id]);

  return group;
};

export { useFirebaseChatGroup, useFirebaseChatGroupById };
