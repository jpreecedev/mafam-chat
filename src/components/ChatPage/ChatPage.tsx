import React from "react";
import firebase from "firebase/app";
import { useParams } from "react-router-dom";

import styles from "./styles.module.css";
import sendImg from "../../assets/send.png";
import { Header } from "../Header";
import { useFirebaseChatGroupById, useFirebaseAuth } from "../../hooks";
import { CHATS_REF, MESSAGES_REF } from "../../constants";
import { Message } from "../../types";
import { ChatMessage } from "../ChatMessage";

const scrollToBottom = (mainEl: React.MutableRefObject<HTMLElement | null>) => {
  setTimeout(() => {
    if (mainEl && mainEl.current) {
      mainEl.current.scrollTo(0, mainEl.current.scrollHeight);
    }
  });
};

const ChatPage = () => {
  const { id } = useParams();
  const [newMessage, setNewMessage] = React.useState<string>("");
  const group = useFirebaseChatGroupById(id || "");
  const user = useFirebaseAuth(firebase);
  const mainEl = React.useRef<HTMLElement | null>(null);

  const renderMessages = () => {
    scrollToBottom(mainEl);
    return (
      group &&
      group.messages &&
      Object.keys(group.messages).map(key => {
        const message: Message = group.messages[key];
        return <ChatMessage message={message} user={user} key={key} />;
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
        senderName: firebase.auth().currentUser?.displayName,
        content: message,
        sent: firebase.database.ServerValue.TIMESTAMP
      });

    setNewMessage("");
  };

  return (
    <div className={styles.container}>
      <Header />
      <h2 className={styles.padded}>{group && group.name}</h2>
      <main className={styles.body} ref={mainEl}>
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
          onKeyPress={e => {
            if (e.key.toLowerCase() === "enter") {
              sendMessage(newMessage);
            }
          }}
        />
        <button
          type="button"
          className={styles.button}
          onClick={() => sendMessage(newMessage)}
        >
          <img src={sendImg} alt="send" />
        </button>
      </footer>
    </div>
  );
};

export { ChatPage };
