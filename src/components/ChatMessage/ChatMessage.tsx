import React from "react";
import clsx from "clsx";
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
  const classes = clsx(styles.message, {
    [styles.hidden]: message.hidden === true
  });

  return (
    <div
      data-sender={message.sender === user?.uid}
      data-name={message.senderName}
      data-receiver={message.sender !== user?.uid}
      data-sent={formatDateTime(new Date(message.sent))}
      className={classes}
    >
      <p className={styles.content}>{message.content}</p>
    </div>
  );
};

export { ChatMessage };
