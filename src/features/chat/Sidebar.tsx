'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LogOut, Plus, Search, MessageSquare, Users, Loader2, AlertCircle, Phone } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { conversationService, userService } from '@/services/chatService';
import { useDebounce } from '@/hooks/useDebounce';
import { Conversation, User } from '@/types/chat';
import GroupModal from './GroupModal';

export default function Sidebar() {
  const queryClient = useQueryClient();
  const { user, logout, activeConversationId, setActiveConversationId, setSidebarOpen } = useChatStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 400);

  // 1. Fetch conversations list
  const {
    data: conversations,
    isPending: isLoadingConvs,
    error: convsError,
    refetch: refetchConvs,
  } = useQuery({
    queryKey: ['conversations'],
    queryFn: conversationService.list,
  });

  // 2. Fetch search users if search query is entered
  const { data: searchResults, isPending: isSearchingUsers } = useQuery({
    queryKey: ['users', 'search', debouncedSearch],
    queryFn: () => userService.search(debouncedSearch),
    enabled: debouncedSearch.trim().length > 0,
  });

  // 3. Mutation to start a conversation
  const startChatMutation = useMutation({
    mutationFn: (userId: string) => conversationService.startDirect(userId),
    onSuccess: (data) => {
      // Refresh list, select active conversation
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      setActiveConversationId(data._id);
      setSearchQuery(''); // Clear search
      setSidebarOpen(false); // Close sidebar on mobile to show panel
    },
  });

  const selectConversation = (id: string) => {
    setActiveConversationId(id);
    setSidebarOpen(false); // Close sidebar on mobile
  };

  const handleStartDirectChat = (userId: string) => {
    startChatMutation.mutate(userId);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout();
      window.location.href = '/login';
    }
  };

  // Date formatter helper
  const formatTime = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      const now = new Date();
      if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      }
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  const isSearchActive = searchQuery.trim().length > 0;

  return (
    <div className="w-full md:w-80 h-full border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col shrink-0">
      
      {/* Header Banner */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/40">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {user?.name.slice(0, 2).toUpperCase() || 'U'}
          </div>
          <div className="overflow-hidden">
            <h1 className="text-sm font-semibold text-zinc-900 dark:text-white truncate max-w-[120px]">{user?.name}</h1>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">{user?.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* New Group Button */}
          <button
            onClick={() => setIsGroupModalOpen(true)}
            title="New Group Chat"
            className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-5 h-5" />
          </button>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/30 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search chat or user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-zinc-300 dark:focus:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 text-sm outline-none transition-colors"
          />
          {isSearchActive && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer"
            >
              <Plus className="w-4 h-4 rotate-45" />
            </button>
          )}
        </div>
      </div>

      {/* Dynamic List Container */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {isSearchActive ? (
          /* User Search Result Area */
          <div className="p-2 space-y-1">
            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 mb-2">
              Global Directory Results
            </h2>
            {isSearchingUsers ? (
              <div className="flex items-center justify-center gap-2 py-8 text-sm text-zinc-500">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                Searching directory...
              </div>
            ) : !searchResults || searchResults.length === 0 ? (
              <div className="p-4 text-center text-sm text-zinc-500">
                No users found for &quot;{searchQuery}&quot;
              </div>
            ) : (
              searchResults.map((searchUser: User) => (
                <button
                  key={searchUser._id}
                  onClick={() => handleStartDirectChat(searchUser._id)}
                  disabled={startChatMutation.isPending}
                  className="w-full flex items-center gap-3 p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 rounded-xl transition-all text-left cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-650 dark:text-zinc-300 font-bold uppercase text-sm">
                    {searchUser.name.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-zinc-900 dark:text-white truncate">
                      {searchUser.name}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-zinc-400" />
                      <span>{searchUser.phone}</span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        ) : (
          /* Conversations List Area */
          <div className="p-1 space-y-0.5">
            {isLoadingConvs ? (
              /* Skeleton Loader */
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 bg-zinc-200 dark:bg-zinc-800 rounded-md w-2/3" />
                    <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/2" />
                  </div>
                </div>
              ))
            ) : convsError ? (
              /* Error State */
              <div className="p-6 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
                <p className="text-sm text-zinc-650 dark:text-zinc-400">Failed to load conversations</p>
                <button
                  onClick={() => refetchConvs()}
                  className="px-3.5 py-1.5 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Retry
                </button>
              </div>
            ) : !conversations || conversations.length === 0 ? (
              /* Empty State */
              <div className="p-8 text-center text-zinc-550 dark:text-zinc-500 space-y-2 mt-8">
                <MessageSquare className="w-10 h-10 text-zinc-350 dark:text-zinc-650 mx-auto mb-2" />
                <p className="text-sm font-semibold">No chats yet</p>
                <p className="text-xs text-zinc-500 max-w-[200px] mx-auto">
                  Search for a user by name or phone above to start a conversation.
                </p>
              </div>
            ) : (
              /* Sorted Active Conversations */
              conversations.map((conv: Conversation) => {
                const isActive = conv._id === activeConversationId;
                
                // Extract display properties based on Direct/Group types
                const isGroup = conv.type === 'group';
                const name = isGroup ? conv.name : conv.participant.name;
                const initials = name.slice(0, 2).toUpperCase();
                
                let lastMessageText = 'No messages yet';
                if (conv.lastMessage && conv.lastMessage.text) {
                  lastMessageText = conv.lastMessage.text;
                }

                return (
                  <button
                    key={conv._id}
                    onClick={() => selectConversation(conv._id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 border-l-3 border-indigo-600'
                        : 'hover:bg-zinc-50 dark:hover:bg-zinc-900 border-l-3 border-transparent'
                    }`}
                  >
                    {/* Avatar Icon */}
                    <div
                      className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-bold text-sm uppercase relative ${
                        isGroup
                          ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                      }`}
                    >
                      {isGroup ? <Users className="w-5 h-5" /> : initials}
                    </div>

                    {/* Chat description info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-zinc-900 dark:text-white truncate mr-2">
                          {name}
                        </span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium shrink-0">
                          {formatTime(conv.updatedAt)}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-550 dark:text-zinc-400 truncate mt-0.5 font-normal">
                        {conv.lastMessage?.sender === user?._id && <span className="text-zinc-400 dark:text-zinc-500 mr-0.5">You:</span>}
                        {lastMessageText}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Group Modal container */}
      <GroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        onSuccess={(groupId) => setActiveConversationId(groupId)}
      />
    </div>
  );
}
