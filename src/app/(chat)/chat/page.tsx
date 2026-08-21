'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { authService } from '@/services/chatService';
import Sidebar from '@/features/chat/Sidebar';
import ChatArea from '@/features/chat/ChatArea';

export default function ChatPage() {
  const router = useRouter();
  const { token, user, setUser, isSidebarOpen, setSidebarOpen, activeConversationId } = useChatStore();
  const [isVerifying, setIsVerifying] = useState(true);

  // Restore session query if token exists but user profile is null
  const { data: profile, status } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authService.me,
    enabled: !!token && !user,
    retry: false,
  });

  // Sync profile data to Zustand store
  useEffect(() => {
    if (profile) {
      setUser(profile);
      setIsVerifying(false);
    }
  }, [profile, setUser]);

  // Route protection redirect checks
  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    if (user) {
      setIsVerifying(false);
      return;
    }

    if (status === 'error') {
      // Token is invalid/expired
      localStorage.removeItem('chat_auth_token');
      router.push('/login');
    }
  }, [token, user, status, router]);

  // Show a loading screen while resolving auth sessions
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
          <Loader2 className="absolute w-6 h-6 text-indigo-400 animate-pulse" />
        </div>
        <p className="mt-4 text-sm text-zinc-400 font-medium">Securing session connection...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-row bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      {/* Desktop view: side-by-side. Mobile view: responsive toggle */}
      <div className={`h-full shrink-0 ${isSidebarOpen ? 'w-full md:w-80 flex' : 'hidden md:flex'}`}>
        <Sidebar />
      </div>

      <div className={`h-full flex-1 min-w-0 ${!isSidebarOpen ? 'flex' : 'hidden md:flex'}`}>
        <ChatArea />
      </div>
    </div>
  );
}
