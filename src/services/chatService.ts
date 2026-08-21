import api from '@/lib/api';
import {
  User,
  LoginResponse,
  Conversation,
  DirectConversation,
  GroupConversation,
  MessagesResponse,
  Message,
} from '@/types/chat';

export const authService = {
  async login(phone: string, name: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', { phone, name });
    return response.data;
  },

  async me(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
};

export const userService = {
  async search(q: string): Promise<User[]> {
    if (!q.trim()) return [];
    const response = await api.get<User[]>('/users/search', {
      params: { q },
    });
    return response.data;
  },
};

export const conversationService = {
  async list(): Promise<Conversation[]> {
    const response = await api.get<{ data: Conversation[] }>('/conversations');
    return response.data.data;
  },

  async startDirect(userId: string): Promise<DirectConversation> {
    const response = await api.post<DirectConversation>('/conversations', { userId });
    return response.data;
  },

  async createGroup(name: string, participantIds: string[]): Promise<GroupConversation> {
    const response = await api.post<GroupConversation>('/conversations/group', {
      name,
      participantIds,
    });
    return response.data;
  },

  async renameGroup(id: string, name: string): Promise<GroupConversation> {
    const response = await api.patch<GroupConversation>(`/conversations/${id}`, { name });
    return response.data;
  },

  async addParticipants(id: string, userIds: string[]): Promise<GroupConversation> {
    const response = await api.post<GroupConversation>(`/conversations/${id}/participants`, {
      userIds,
    });
    return response.data;
  },

  async removeParticipant(id: string, userId: string): Promise<GroupConversation> {
    const response = await api.delete<GroupConversation>(`/conversations/${id}/participants/${userId}`);
    return response.data;
  },

  async promoteAdmin(id: string, userId: string): Promise<GroupConversation> {
    const response = await api.post<GroupConversation>(`/conversations/${id}/admins`, {
      userId,
    });
    return response.data;
  },
};

export const messageService = {
  async getHistory(
    conversationId: string,
    limit: number = 20,
    before?: string
  ): Promise<MessagesResponse> {
    const response = await api.get<MessagesResponse>(`/conversations/${conversationId}/messages`, {
      params: { limit, before },
    });
    return response.data;
  },

  async send(conversationId: string, text: string): Promise<Message> {
    const response = await api.post<Message>('/messages', { conversationId, text });
    return response.data;
  },
};
