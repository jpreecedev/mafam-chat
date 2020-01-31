import { Message } from "../../types";

const flattenAndCleanSentMessages = (messages: Message[][] | undefined) => {
  if (!messages || !messages.length || !messages[0].length) {
    return [];
  }

  const result: Message[] = [];

  for (let i = 0; i < messages.length; i++) {
    const currentArray = messages[i];
    if (currentArray.length === 0) {
      continue;
    }

    if (currentArray.length === 1) {
      result.push(currentArray[0]);
      continue;
    }

    for (let j = 1; j < currentArray.length; j++) {
      currentArray[j - 1].hidden = true;
    }

    result.push(...currentArray);
  }

  return result;
};

export { flattenAndCleanSentMessages };
