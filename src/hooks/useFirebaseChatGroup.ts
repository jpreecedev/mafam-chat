import React from "react";
import firebase from "firebase/app";

import { Group, Message } from "../types";
import { CHATS_REF } from "../constants";

const getLastMessage = (snapshot: any): Message => {
  if (!snapshot) {
    return {} as Message;
  }

  const arr = Object.keys(snapshot);
  const lastMessageKey = arr[arr.length - 1];
  return snapshot[lastMessageKey];
};

const useFirebaseChatGroup = () => {
  const [groups, setGroups] = React.useState<Group[]>([]);

  React.useEffect(() => {
    const chatRef = firebase.database().ref(CHATS_REF);

    chatRef.on("value", snapshot => {
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
        participants: val[key].participants || {},
        lastMessage: getLastMessage(val[key].messages)
      }));

      setGroups(groups);
    });

    return () => {
      chatRef.off("value");
    };
  }, []);

  return groups;
};

const useFirebaseChatGroupById = (id: string) => {
  const [group, setGroup] = React.useState<Group | null>(null);
  const userId = firebase.auth().currentUser?.uid;

  React.useEffect(() => {
    const chatRef = firebase
      .database()
      .ref(CHATS_REF)
      .child(id);

    if (userId) {
      chatRef.child("participants").update({
        [userId]: true
      });
    }

    chatRef.on("value", snapshot => {
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
        participants: val.participants || {},
        lastMessage:
          val.messages && val.messages.length > -1
            ? val.messages[val.messages.length - 1]
            : null
      });
    });

    return () => {
      chatRef.off("value");
    };
  }, [id, userId]);

  return group;
};

export { useFirebaseChatGroup, useFirebaseChatGroupById };
