import { skills, timezones } from '@/utils/constants';

export type Filter = {
  id: string
  user: User
  userId: string
  createdAt: Date
  updatedAt: Date
  skill: keyof typeof skills | null;
  timezone: (typeof timezones)[number] | null;
};

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  description?: string | null;
  image: string | null;
  timezone: string | null;
  skill?: keyof typeof skills | null;
  filter?: Filter | null;
  createdAt: Date
  updatedAt: Date
};

export type ProfileType = Pick<User, 'name' | 'description' | 'email' | 'id' | 'skill' | 'image'>;

export type CurrentUser = {
  name: string | null;
  email: string;
  image: string | null;
  id: string;
};

export type ConversationUser = {
  id: string
  conversation: Conversation
  conversationId: string
  user: User
  userId: string
  createdAt: Date
  updatedAt: Date
}

export type Conversation = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  users: ConversationUser[];
  messages: ConversationMessage[];
};

export type ConversationMessage = {
  id: string;
  content: string;
  conversation: Conversation;
  conversationId: string;
  user: User;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
