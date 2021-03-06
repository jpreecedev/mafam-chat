import { Message } from "../../types";

const dateDifference = (date1: Date, date2: Date) => {
  const diffTime = Math.abs((date2 as any) - (date1 as any));
  return Math.ceil(diffTime / (1000 * 60));
};

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

      if (
        lastMessage.sender === message.sender &&
        dateDifference(lastMessage.sent as Date, message.sent as Date) <= 5
      ) {
        lastArray.push(message);
      } else {
        result.push([message]);
      }
    }
  }

  return result;
};

export { groupMessages };
