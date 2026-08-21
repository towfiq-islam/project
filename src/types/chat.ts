export interface User {
  _id: string;
  name: string;
  phone: string;
}

export interface Message {
  _id: string;
  conversation: string;
  sender: string; // User ID string
  text: string;
  createdAt: string;
}

export interface DirectConversation {
  _id: string;
  type: 'direct';
  lastMessage?: {
    text: string;
    sender: string;
    createdAt: string;
  };
  updatedAt: string;
  createdAt?: string;
  participant: User;
}

export interface GroupConversation {
  _id: string;
  type: 'group';
  name: string;
  createdBy: string; // User ID string
  admins: string[]; // Array of User ID strings
  participants: User[];
  lastMessage?: {
    text: string;
    sender: string;
    createdAt: string;
  };
  updatedAt: string;
  createdAt?: string;
}

export type Conversation = DirectConversation | GroupConversation;

export interface LoginResponse {
  token: string;
}

export interface MessagesResponse {
  messages: Message[];
  hasMore: boolean;
}

export interface SearchUsersResponse extends Array<User> {}
