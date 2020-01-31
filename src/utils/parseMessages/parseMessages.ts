import { Message } from "../../types";

const parseMessages = (messages: any): Message[] => {
  if (!messages) {
    return [];
  }

  return Object.keys(messages).map(key => ({
    ...messages[key],
    parentKey: key
  }));
};

export { parseMessages };
