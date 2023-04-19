import axios, { AxiosPromise } from 'axios';
import { Conversation, ConversationMessage, Filter, User, UserData } from '@/types/model';
import { PaginationPayload } from '@/types/common';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const restClient = {
  profiles: {
    processProfile: (payload: {
      targetId: number;
      liked: boolean;
    }): AxiosPromise<{ targetUser: UserData; nextProfile: UserData; hasMatch: boolean }> =>
      axiosInstance.post('/api/profiles', payload),
  },
  user: {
    filter: {
      update: (payload: Partial<Filter>): AxiosPromise<{ filter: Filter }> =>
        axiosInstance.put('/api/user/filter', payload),
      get: (): AxiosPromise<{ filter: Filter }> => axiosInstance.get('/api/user/filter'),
    },
    profile: {
      get: (): AxiosPromise<{ user: User }> => axiosInstance.get('/api/user/profile'),
      update: (
        payload: Partial<Filter & { name: string; image: string }>,
      ): AxiosPromise<{ user: User }> => axiosInstance.put('/api/user/profile', payload),
    },
  },
  conversations: {
    message: {
      create: (
        id: number,
        payload: { content: string },
      ): AxiosPromise<{ message: ConversationMessage }> =>
        axiosInstance.post(`/api/conversations/${id}`, payload),
    },
    conversation: {
      get: (id: number): AxiosPromise<{ conversation: Conversation }> =>
        axiosInstance.get(`/api/conversations/${id}`),
      getAll: (payload: PaginationPayload): AxiosPromise<{ conversation: Conversation }> =>
        axiosInstance.get(`/api/conversations?page=${payload.page}&perPage=${payload.perPage}`),
    },
  },
  fetcher: (url: string) => axiosInstance.get(url).then((res) => res.data),
};


export default restClient;
