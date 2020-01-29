import { Message } from "../types";

const groupMessages = (messages: Message[] | undefined): Message[][] => {
  if (!messages || !messages.length) {
    return [];
  }

  const result: Message[][] = [[]];

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const lastArray = result[result.length - 1];

    if (!lastArray.length) {
      lastArray.push(message);
    } else {
      const lastMessage = lastArray[lastArray.length - 1];

      if (lastMessage.sender === message.sender) {
        lastArray.push(message);
      } else {
        result.push([message]);
      }
    }
  }

  return result;
};

export { groupMessages };
