export type Message = {
  sender: string;
  senderName: string;
  sent: Date | number;
  content: string;
  avatar: string;
  hidden?: boolean;
  parentKey: string;
};

export type User = {
  key: string;
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
};

export type Group = {
  key: string;
  created: Date;
  name: string;
  messages: Object;
  lastMessage: Message;
};
