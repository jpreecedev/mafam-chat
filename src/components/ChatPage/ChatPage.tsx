import React from "react";
import firebase from "firebase/app";
import { useParams } from "react-router-dom";

import styles from "./styles.module.css";
import sendImg from "../../assets/send.png";
import { Header } from "../Header";
import { useFirebaseChatGroupById, useFirebaseAuth } from "../../hooks";
import { CHATS_REF, MESSAGES_REF } from "../../constants";
import { ChatMessage } from "../ChatMessage";
import { groupRelatedMessages, parseMessages } from "../../utils";

const scrollToBottom = (mainEl: React.MutableRefObject<HTMLElement | null>) => {
  setTimeout(() => {
    if (mainEl && mainEl.current) {
      mainEl.current.scrollTo(0, mainEl.current.scrollHeight);
    }
  });
};

const ChatPage = () => {
  const { id = "" } = useParams();
  const [newMessage, setNewMessage] = React.useState<string>("");
  const group = useFirebaseChatGroupById(id);
  const user = useFirebaseAuth(firebase);
  const mainEl = React.useRef<HTMLElement | null>(null);

  const messages = group
    ? groupRelatedMessages(parseMessages(group.messages))
    : [];

  const renderMessages = () => {
    scrollToBottom(mainEl);

    if (!messages.length) {
      return null;
    }

    return messages.map(message => (
      <ChatMessage message={message} user={user} key={message.parentKey} />
    ));
  };

  const renderNoMessages = () => {
    return (
      messages.length === 0 && (
        <p className={styles.noMessages}>There are no messages right now.</p>
      )
    );
  };

  const sendMessage = (message: string) => {
    if (!message) {
      return;
    }

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
          autoComplete="off"
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
