export type Message = {
  sender: string;
  sent: Date;
  content: string;
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
  lastMessage: string;
};
