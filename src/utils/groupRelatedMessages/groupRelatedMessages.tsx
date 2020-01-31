import { flattenAndCleanSentMessages } from "../flattenAndCleanSentMessages";
import { groupMessages } from "../groupMessages";
import { Message } from "../../types";

const groupRelatedMessages = (messages: Message[]): Message[] => {
  return flattenAndCleanSentMessages(groupMessages(messages));
};

export { groupRelatedMessages };
