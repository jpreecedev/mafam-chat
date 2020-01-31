import { parseMessages } from "./parseMessages";
import { Message } from "../../types";

describe("Parse messages tests", () => {
  it("should return an empty array when messages is undefined", () => {
    const messages = undefined;
    const expectedResult = [];

    const result = parseMessages(messages);

    expect(result).toEqual(expectedResult);
  });

  it("should return an empty array when messages is null", () => {
    const messages = null;
    const expectedResult = [];

    const result = parseMessages(messages);

    expect(result).toEqual(expectedResult);
  });

  it("should return one message", () => {
    const messages = {
      "-LzgdHQ6NNGwBclW_cWw": {
        avatar:
          "https://lh3.googleusercontent.com/a-/AAuE7mD_R6mWgyIuWA-yhMa73P3YUOI0fU5hM3vWihCUdok",
        content: "test message",
        sender: "EQyFhLwzlNUscjtN2IUc61ki2sy1",
        senderName: "Jon Preece",
        sent: 1580223245194
      }
    };

    const expectedResult: Message[] = [
      {
        avatar:
          "https://lh3.googleusercontent.com/a-/AAuE7mD_R6mWgyIuWA-yhMa73P3YUOI0fU5hM3vWihCUdok",
        content: "test message",
        sender: "EQyFhLwzlNUscjtN2IUc61ki2sy1",
        senderName: "Jon Preece",
        sent: 1580223245194,
        parentKey: "-LzgdHQ6NNGwBclW_cWw"
      }
    ];

    const result = parseMessages(messages);

    expect(result).toEqual(expectedResult);
  });

  it("should return two messages", () => {
    const messages = {
      "-LzgdHQ6NNGwBclW_cWw": {
        avatar:
          "https://lh3.googleusercontent.com/a-/AAuE7mD_R6mWgyIuWA-yhMa73P3YUOI0fU5hM3vWihCUdok",
        content: "test message",
        sender: "EQyFhLwzlNUscjtN2IUc61ki2sy1",
        senderName: "Jon Preece",
        sent: 1580223245194
      },
      "-LzgdHQ6NNGwBclW_XXX": {
        avatar: "second avatar",
        content: "test message 2",
        sender: "some sender",
        senderName: "Some sender name",
        sent: 1580213245194
      }
    };

    const expectedResult: Message[] = [
      {
        avatar:
          "https://lh3.googleusercontent.com/a-/AAuE7mD_R6mWgyIuWA-yhMa73P3YUOI0fU5hM3vWihCUdok",
        content: "test message",
        sender: "EQyFhLwzlNUscjtN2IUc61ki2sy1",
        senderName: "Jon Preece",
        sent: 1580223245194,
        parentKey: "-LzgdHQ6NNGwBclW_cWw"
      },
      {
        avatar: "second avatar",
        content: "test message 2",
        sender: "some sender",
        senderName: "Some sender name",
        sent: 1580213245194,
        parentKey: "-LzgdHQ6NNGwBclW_XXX"
      }
    ];

    const result = parseMessages(messages);

    expect(result).toEqual(expectedResult);
  });
});
