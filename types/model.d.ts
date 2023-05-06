import { professions, timezones } from '@/utils/constants';
export type Filter = {
  id: number;
  user: User;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  profession: keyof typeof professions;
  timezone: (typeof timezones)[number];
};

export type User = {
  id: number;
  name: string;
  email: string;
  emailVerified: string | null;
  description: string | null;
  image: string | null;
  timezone: string | null;
  passwordHash: string | null;
  passwordSalt: string | null;
  profession: keyof typeof professions | null;
  filter: Filter | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserData = {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
  timezone: (typeof timezones)[number];
  profession: keyof typeof professions;
};

export type CurrentUser = {
  name: string;
  email: string;
  image: string | null;
  id: number;
};

export type ConversationUser = {
  id: number;
  conversation: Conversation;
  conversationId: number;
  user: User;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Conversation = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  users: ConversationUser[];
  messages: ConversationMessage[];
};

export type ConversationMessage = {
  id: number;
  content: string;
  conversation: Conversation;
  conversationId: number;
  user: User;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ConversationMessageExtended = {
  isMine?: boolean;
  renderDate?: boolean;
} & ConversationMessage;
