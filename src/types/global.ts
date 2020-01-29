export type Message = {
  sender: string;
  senderName: string;
  sent: Date;
  content: string;
  avatar: string;
  hidden: boolean;
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
  messages: Message[];
  lastMessage: Message;
};
