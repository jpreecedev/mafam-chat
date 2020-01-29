import { flattenAndCleanSentMessages } from "./flattenAndCleanSentMessages";
import { groupMessages } from "./groupMessages";
import { Message } from "../types";

const groupRelatedMessages = (messages: Message[]): Message[] => {
  const mappedMessages = Object.keys(messages).map(key => {
    return { ...messages[key] };
  });

  const groupedMessages = groupMessages(mappedMessages);
  return flattenAndCleanSentMessages(groupedMessages);
};

export { groupRelatedMessages };
