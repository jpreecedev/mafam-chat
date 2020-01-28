import React from "react";
import { formatDateTime } from "../../utils";

import styles from "./styles.module.css";
import { Message } from "../../types";

interface ChatMessageProps {
  message: Message;
  user: firebase.User | null;
}

const ChatMessage: React.FunctionComponent<ChatMessageProps> = ({
  message,
  user
}) => {
  return (
    <div
      data-sender={message.sender === user?.uid}
      data-name={message.senderName}
      data-receiver={message.sender !== user?.uid}
      data-sent={formatDateTime(new Date(message.sent))}
      className={styles.message}
    >
      <p className={styles.content}>{message.content}</p>
    </div>
  );
};

export { ChatMessage };
