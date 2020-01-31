import { Message } from "../../types";
import { groupMessages } from "./groupMessages";

describe("Group messages tests", () => {
  let messageFromSenderA: Message;
  let messageFromSenderB: Message;

  const getRandomMessage = (sender: string, content: string): Message => ({
    sender,
    content,
    avatar: "avatar",
    senderName: "senderName",
    sent: new Date(),
    hidden: false
  });

  beforeEach(() => {
    messageFromSenderA = {
      avatar: "avatarA",
      content: "contentA",
      sender: "senderA",
      senderName: "senderNameA",
      sent: new Date(),
      hidden: false
    };
    messageFromSenderB = {
      avatar: "avatarB",
      content: "contentB",
      sender: "senderB",
      senderName: "senderNameB",
      sent: new Date(),
      hidden: false
    };
  });

  it("should return an empty array when messages is undefined", () => {
    const messages: Message[] = undefined;
    const expectedResult: Message[] = [];

    const result = groupMessages(messages);

    expect(result).toEqual(expectedResult);
  });

  it("should return an empty array when messages is empty", () => {
    const messages: Message[] = [];
    const expectedResult: Message[] = [];

    const result = groupMessages(messages);

    expect(result).toEqual(expectedResult);
  });

  it("should return one group when only one message", () => {
    const messages: Message[] = [messageFromSenderA];
    const expectedResult: Message[][] = [[messageFromSenderA]];

    const result = groupMessages(messages);

    expect(result).toEqual(expectedResult);
  });

  it("should return one group when two messages are from same senders", () => {
    const messages: Message[] = [messageFromSenderA, messageFromSenderA];
    const expectedResult: Message[][] = [
      [messageFromSenderA, messageFromSenderA]
    ];

    const result = groupMessages(messages);

    expect(result).toEqual(expectedResult);
  });

  it("should return two groups when two messages are from different senders", () => {
    const messages: Message[] = [messageFromSenderA, messageFromSenderB];
    const expectedResult: Message[][] = [
      [messageFromSenderA],
      [messageFromSenderB]
    ];

    const result = groupMessages(messages);

    expect(result).toEqual(expectedResult);
  });

  it("should return two groups, first containing 2 messages, second containing 1 message", () => {
    const messages: Message[] = [
      messageFromSenderA,
      messageFromSenderA,
      messageFromSenderB
    ];
    const expectedResult: Message[][] = [
      [messageFromSenderA, messageFromSenderA],
      [messageFromSenderB]
    ];

    const result = groupMessages(messages);

    expect(result).toEqual(expectedResult);
  });

  it("should work with a basic conversation", () => {
    const message1 = getRandomMessage("senderA", "Hi");
    const message2 = getRandomMessage("senderA", "Yo");
    const message3 = getRandomMessage("senderA", "Sup");
    const message4 = getRandomMessage("senderB", "No");
    const message5 = getRandomMessage("senderA", "Yep");
    const message6 = getRandomMessage("senderB", "What");
    const message7 = getRandomMessage("senderB", "Boop");

    const messages: Message[] = [
      message1,
      message2,
      message3,
      message4,
      message5,
      message6,
      message7
    ];
    const expectedResult: Message[][] = [
      [message1, message2, message3],
      [message4],
      [message5],
      [message6, message7]
    ];

    const result = groupMessages(messages);

    expect(result).toEqual(expectedResult);
  });
});
