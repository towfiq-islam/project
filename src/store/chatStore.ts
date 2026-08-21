import { create } from 'zustand';
import { User } from '@/types/chat';

interface ChatState {
  token: string | null;
  user: User | null;
  activeConversationId: string | null;
  isSidebarOpen: boolean;
  socketConnected: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setActiveConversationId: (id: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
  setSocketConnected: (connected: boolean) => void;
  logout: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  // Initialize token from localStorage safely if run on client side
  token: typeof window !== 'undefined' ? localStorage.getItem('chat_auth_token') : null,
  user: null,
  activeConversationId: null,
  isSidebarOpen: true, // true shows conversation list sidebar, false shows message history panel on mobile
  socketConnected: false,
  setToken: (token) => {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('chat_auth_token', token);
      } else {
        localStorage.removeItem('chat_auth_token');
      }
    }
    set({ token });
  },
  setUser: (user) => set({ user }),
  setActiveConversationId: (id) => set({ activeConversationId: id }),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setSocketConnected: (connected) => set({ socketConnected: connected }),
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chat_auth_token');
    }
    set({ token: null, user: null, activeConversationId: null, socketConnected: false, isSidebarOpen: true });
  },
}));
