import axios, {AxiosPromise} from 'axios';
import {Conversation as ConversationType, Conversation, Filter, ProfileType, User} from '@/types/model';
import {Fetcher} from "swr";

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const restClient = {
  profiles: {
    processProfile: (payload: { targetId: string; liked: boolean }) =>
      axiosInstance.post<{ targetUser: User; nextProfile: ProfileType; hasMatch: boolean }>(
        '/api/profiles',
        payload,
      ),
  },
  user: {
    filter: {
      update: (payload: Partial<Filter>) =>
        axiosInstance.put<{ filter: Filter }>('/api/user/filter', payload),
      get: () => axiosInstance.get<{ filter: Filter }>('/api/user/filter'),
    },
    profile: {
      get: () => axiosInstance.get<{ user: User }>('/api/user/profile'),
      update: (payload: Partial<Filter & { name: string; image: string }>) =>
        axiosInstance.put<{ user: User }>('/api/user/profile', payload),
    },
  },
  conversations: {
    message: {
      create: (id: string, payload: { content: string }) =>
        axiosInstance.post(`/api/conversations/${id}`, payload),
    },
  },
  fetcher:((url: string) => axiosInstance.get(url).then(res => res.data)) as Fetcher<{ conversation: ConversationType }, string>   ,
};

export default restClient;
