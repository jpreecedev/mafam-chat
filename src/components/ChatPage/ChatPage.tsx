import React from "react";
import firebase from "firebase/app";
import { useParams } from "react-router-dom";

import styles from "./styles.module.css";
import sendImg from "../../assets/send.png";
import { Header } from "../Header";
import { formatDateTime } from "../../utils";
import { useFirebaseChatGroupById, useFirebaseAuth } from "../../hooks";
import { CHATS_REF, MESSAGES_REF } from "../../constants";
import { Message } from "../../types";

const ChatPage = () => {
  const { id } = useParams();
  const [newMessage, setNewMessage] = React.useState<string>("");
  const group = useFirebaseChatGroupById(id || "");
  const user = useFirebaseAuth(firebase);

  const renderMessages = () => {
    return (
      group &&
      group.messages &&
      Object.keys(group.messages).map(key => {
        const message: Message = group.messages[key];
        return (
          <div
            data-sender={message.sender === user?.uid}
            data-receiver={message.sender !== user?.uid}
            data-sent={formatDateTime(new Date(message.sent))}
            className={styles.message}
          >
            <p className={styles.content}>{message.content}</p>
          </div>
        );
      })
    );
  };

  const renderNoMessages = () => {
    return (
      group &&
      group.messages &&
      Object.keys(group.messages).length === 0 && (
        <p className={styles.noMessages}>There are no messages right now.</p>
      )
    );
  };

  const sendMessage = (message: string) => {
    firebase
      .database()
      .ref(`${CHATS_REF}/${id}/${MESSAGES_REF}`)
      .push({
        avatar: firebase.auth().currentUser?.providerData[0]?.photoURL,
        sender: firebase.auth().currentUser?.uid,
        content: message,
        sent: firebase.database.ServerValue.TIMESTAMP
      });

    setNewMessage("");
  };

  return (
    <div className={styles.container}>
      <Header />
      <h2 className={styles.padded}>{group && group.name}</h2>
      <main className={styles.body}>
        {renderMessages()}
        {renderNoMessages()}
      </main>
      <footer className={styles.footer}>
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Type your message here"
          minLength={1}
          value={newMessage}
          onChange={e => setNewMessage(e.currentTarget.value)}
        />
        <button type="button" onClick={() => sendMessage(newMessage)}>
          <img src={sendImg} alt="send" />
        </button>
      </footer>
    </div>
  );
};

export { ChatPage };
