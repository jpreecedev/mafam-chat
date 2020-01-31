import { Message } from "../../types";
import { flattenAndCleanSentMessages } from "../flattenAndCleanSentMessages";

describe("Flatten and Clean Sent Messages tests", () => {
  let messageFromSenderA: Message = {
    avatar: "avatarA",
    content: "contentA",
    sender: "senderA",
    senderName: "senderNameA",
    sent: new Date(),
    hidden: false,
    parentKey: "parentKey"
  };

  it("should return an empty array when messages is undefined", () => {
    const messages = undefined;
    const expectedResult = [];

    const result = flattenAndCleanSentMessages(messages);

    expect(result).toEqual(expectedResult);
  });

  it("should return an empty array when messages is empty", () => {
    const messages = [];
    const expectedResult = [];

    const result = flattenAndCleanSentMessages(messages);

    expect(result).toEqual(expectedResult);
  });

  it("should return an empty array when messages is empty and child array is empty", () => {
    const messages = [[]];
    const expectedResult = [];

    const result = flattenAndCleanSentMessages(messages);

    expect(result).toEqual(expectedResult);
  });

  it("should return an array with one child with a sender name when only 1 child in child array", () => {
    const messages = [[messageFromSenderA]];
    const expectedResult = [messageFromSenderA];

    const result = flattenAndCleanSentMessages(messages);

    expect(result).toEqual(expectedResult);
  });

  it("should return an empty array when the child array has no children", () => {
    const messages = [[]];
    const expectedResult = [];

    const result = flattenAndCleanSentMessages(messages);

    expect(result).toEqual(expectedResult);
  });

  it("should return an array with two children with only 1 sender name when only 2 children in child array", () => {
    const copyOfA = JSON.parse(JSON.stringify(messageFromSenderA));

    const messages = [[messageFromSenderA, copyOfA]];
    const expectedResult = [
      {
        ...messageFromSenderA,
        hidden: true
      },
      copyOfA
    ];

    const result = flattenAndCleanSentMessages(messages);

    expect(result).toEqual(expectedResult);
  });
});
