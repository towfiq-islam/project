'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '@/store/chatStore';
import { Message } from '@/types/chat';

// Create TanStack Query Client
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

function SocketManager({ children }: { children: React.ReactNode }) {
  const { token, setSocketConnected, activeConversationId } = useChatStore();
  const [socket, setSocket] = useState<Socket | null>(null);
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
        setSocketConnected(false);
      }
      return;
    }

    // Connect to backend root host URL
    const s = io('https://frontend-task-chatapp.onrender.com', {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnectionDelayMax: 10000,
    });

    socketRef.current = s;
    setSocket(s);

    s.on('connect', () => {
      console.log('Socket.io connected successfully');
      setSocketConnected(true);
    });

    s.on('disconnect', () => {
      console.log('Socket.io disconnected');
      setSocketConnected(false);
    });

    s.on('connect_error', (err) => {
      console.error('Socket.io connection error:', err);
      setSocketConnected(false);
    });

    // Handle new message arrival
    s.on('message:new', (msg: Message) => {
      console.log('Realtime message received:', msg);

      // 1. Update the message history cache for this conversation
      queryClient.setQueryData(['messages', msg.conversation], (oldData: any) => {
        if (!oldData || !oldData.pages) {
          // If we haven't loaded pages (e.g. not a useInfiniteQuery format)
          if (oldData && oldData.messages) {
            const exists = oldData.messages.some((m: Message) => m._id === msg._id);
            if (exists) return oldData;
            return {
              ...oldData,
              messages: [msg, ...oldData.messages],
            };
          }
          return oldData;
        }

        // Handle infinite query format (used for cursor pagination)
        const pageExists = oldData.pages.some((page: any) =>
          page.messages.some((m: Message) => m._id === msg._id)
        );

        if (pageExists) return oldData;

        // Append to the first page (newest messages page)
        const newPages = [...oldData.pages];
        if (newPages[0]) {
          newPages[0] = {
            ...newPages[0],
            messages: [msg, ...newPages[0].messages],
          };
        }

        return {
          ...oldData,
          pages: newPages,
        };
      });

      // 2. Invalidate the conversation list query to update the lastMessage and trigger sorting
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    });

    // Handle group conversation updates
    s.on('conversation:updated', (updatedConv) => {
      console.log('Realtime conversation updated:', updatedConv);
      // Invalidate both conversation details and list
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['conversation', updatedConv._id] });
    });

    return () => {
      s.disconnect();
      socketRef.current = null;
      setSocket(null);
      setSocketConnected(false);
    };
  }, [token, queryClient, setSocketConnected]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <SocketManager>{children}</SocketManager>
    </QueryClientProvider>
  );
}
