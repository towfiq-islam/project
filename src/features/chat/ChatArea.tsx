'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Send,
  Loader2,
  ChevronDown,
  ArrowLeft,
  Users,
  Settings,
  X,
  UserPlus,
  Crown,
  Trash2,
  AlertCircle,
  Edit2,
  Check,
  MessageSquare,
  LogOut,
} from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { messageService, conversationService, userService } from '@/services/chatService';
import { useSocket } from '@/app/providers';
import { Message, Conversation, User } from '@/types/chat';
import { useDebounce } from '@/hooks/useDebounce';

export default function ChatArea() {
  const queryClient = useQueryClient();
  const socket = useSocket();
  const { user: currentUser, activeConversationId, setActiveConversationId, setSidebarOpen } = useChatStore();

  const [messageText, setMessageText] = useState('');
  const [showGroupSettings, setShowGroupSettings] = useState(false);
  const [showNewMessagesBtn, setShowNewMessagesBtn] = useState(false);
  
  // Group settings UI state
  const [newGroupName, setNewGroupName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [groupActionError, setGroupActionError] = useState<string | null>(null);

  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);
  const isNearBottomRef = useRef<boolean>(true);

  const debouncedMemberSearch = useDebounce(memberSearchQuery, 400);

  // 1. Fetch conversations list
  const { data: conversations } = useQuery<Conversation[]>({
    queryKey: ['conversations'],
    enabled: !!activeConversationId,
  });

  const activeConversation = conversations?.find((c) => c._id === activeConversationId);

  // 2. Fetch Message History (Infinite query)
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isHistoryPending,
    isError: isHistoryError,
    refetch: refetchHistory,
  } = useInfiniteQuery({
    queryKey: ['messages', activeConversationId],
    queryFn: ({ pageParam }) =>
      messageService.getHistory(activeConversationId as string, 20, pageParam as string | undefined),
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.hasMore || lastPage.messages.length === 0) return undefined;
      // Cursor is the ID of the oldest message in the array
      return lastPage.messages[lastPage.messages.length - 1]._id;
    },
    enabled: !!activeConversationId,
    initialPageParam: undefined as string | undefined,
  });

  // Flattened messages from pages (stored from newest to oldest)
  const messagesList = infiniteData ? infiniteData.pages.flatMap((page: any) => page.messages) : [];
  
  // Reversal for UI rendering (so they render in chronological order: oldest to newest)
  const chronologicalMessages = [...messagesList].reverse();

  // 3. Send Message Mutation
  const sendMessageMutation = useMutation({
    mutationFn: (text: string) => messageService.send(activeConversationId as string, text),
    onSuccess: (newMsg) => {
      setMessageText('');
      
      // Update cache instantly
      queryClient.setQueryData(['messages', activeConversationId], (oldData: any) => {
        if (!oldData) return oldData;
        
        // Infinite Query Page structure
        if (oldData.pages) {
          const newPages = [...oldData.pages];
          if (newPages[0]) {
            const exists = newPages[0].messages.some((m: Message) => m._id === newMsg._id);
            if (!exists) {
              newPages[0] = {
                ...newPages[0],
                messages: [newMsg, ...newPages[0].messages],
              };
            }
          }
          return { ...oldData, pages: newPages };
        }

        return oldData;
      });

      // Refetch conversation list to reorder conversations
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      
      // Force scroll to bottom when sending
      setTimeout(scrollToBottom, 50);
    },
  });

  // 4. Search users to ADD to group
  const { data: memberSearchResults, isPending: isSearchingMembers } = useQuery({
    queryKey: ['users', 'search', 'add-to-group', debouncedMemberSearch],
    queryFn: () => userService.search(debouncedMemberSearch),
    enabled: debouncedMemberSearch.trim().length > 0 && activeConversation?.type === 'group',
  });

  // 5. Group Management Mutations
  const renameGroupMutation = useMutation({
    mutationFn: (name: string) => conversationService.renameGroup(activeConversationId as string, name),
    onSuccess: () => {
      setIsEditingName(false);
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (err: any) => setGroupActionError(err.message || 'Failed to rename group'),
  });

  const addParticipantMutation = useMutation({
    mutationFn: (userId: string) =>
      conversationService.addParticipants(activeConversationId as string, [userId]),
    onSuccess: () => {
      setMemberSearchQuery('');
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (err: any) => setGroupActionError(err.message || 'Failed to add user'),
  });

  const removeParticipantMutation = useMutation({
    mutationFn: (userId: string) =>
      conversationService.removeParticipant(activeConversationId as string, userId),
    onSuccess: (data, userId) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      // If we left the group, close chat area
      const isSelf = userId === currentUser?._id;
      if (isSelf) {
        setActiveConversationId(null);
        setSidebarOpen(true);
      }
    },
    onError: (err: any) => setGroupActionError(err.message || 'Failed to remove member'),
  });

  const promoteAdminMutation = useMutation({
    mutationFn: (userId: string) =>
      conversationService.promoteAdmin(activeConversationId as string, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (err: any) => setGroupActionError(err.message || 'Failed to promote member'),
  });

  // Scroll to bottom helper
  const scrollToBottom = () => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
      setShowNewMessagesBtn(false);
    }
  };

  // Scroll tracking to detect "near bottom" and trigger pagination
  const handleScroll = () => {
    const el = scrollViewportRef.current;
    if (!el) return;

    // Detect if scroll is at the top to fetch previous page of messages
    if (el.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      // Record scroll height before loading to maintain anchor position
      prevScrollHeightRef.current = el.scrollHeight;
      fetchNextPage();
    }

    // Detect if user is near the bottom
    const offset = el.scrollHeight - el.scrollTop - el.clientHeight;
    const nearBottom = offset < 150;
    isNearBottomRef.current = nearBottom;

    if (nearBottom) {
      setShowNewMessagesBtn(false);
    }
  };

  // Auto-scroll side-effects on active conversation changes
  useEffect(() => {
    setShowGroupSettings(false);
    setNewGroupName('');
    setIsEditingName(false);
    setMemberSearchQuery('');
    setGroupActionError(null);
    setShowNewMessagesBtn(false);
    isNearBottomRef.current = true;
    
    // Set a tiny timeout to ensure DOM messages are rendered
    setTimeout(scrollToBottom, 100);
  }, [activeConversationId]);

  // Adjust scroll position after loading older messages (scroll anchoring)
  useEffect(() => {
    const el = scrollViewportRef.current;
    if (el && prevScrollHeightRef.current > 0 && isFetchingNextPage === false) {
      const addedHeight = el.scrollHeight - prevScrollHeightRef.current;
      el.scrollTop = el.scrollTop + addedHeight;
      prevScrollHeightRef.current = 0;
    }
  }, [chronologicalMessages.length, isFetchingNextPage]);

  // Auto-scroll when new messages arrive
  const prevMessagesCount = useRef(0);
  useEffect(() => {
    if (chronologicalMessages.length > prevMessagesCount.current) {
      const lastMsg = chronologicalMessages[chronologicalMessages.length - 1];
      const isSentByMe = lastMsg?.sender === currentUser?._id;

      if (isSentByMe || isNearBottomRef.current) {
        scrollToBottom();
      } else {
        // Show floating unread banner if sent by someone else while user scrolled up
        setShowNewMessagesBtn(true);
      }
    }
    prevMessagesCount.current = chronologicalMessages.length;
  }, [chronologicalMessages, currentUser?._id]);

  if (!activeConversationId) {
    return (
      <div className="flex-1 h-full hidden md:flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/10 text-zinc-550 dark:text-zinc-500 p-8 text-center select-none">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-550 dark:text-indigo-400 flex items-center justify-center mb-4 border border-indigo-100 dark:border-indigo-900/30">
          <Send className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">No active conversation</h3>
        <p className="text-sm mt-1.5 max-w-[280px] text-zinc-400">
          Select a colleague from the sidebar directory to start sending real-time messages.
        </p>
      </div>
    );
  }

  if (!activeConversation) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-2" />
        <span className="text-sm text-zinc-500">Loading conversation metadata...</span>
      </div>
    );
  }

  const isGroup = activeConversation.type === 'group';
  const chatTitle = isGroup ? activeConversation.name : activeConversation.participant.name;
  const isUserAdmin = isGroup && activeConversation.admins.includes(currentUser?._id || '');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || sendMessageMutation.isPending) return;
    sendMessageMutation.mutate(messageText.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  // Group user role helper
  const isMemberAdmin = (userId: string) => {
    return isGroup && activeConversation.admins.includes(userId);
  };

  return (
    <div className="flex-1 h-full bg-zinc-50 dark:bg-zinc-900/30 flex flex-row min-w-0 relative">
      
      {/* Main chat viewport area */}
      <div className="flex-1 h-full flex flex-col min-w-0 relative bg-zinc-150/20 dark:bg-zinc-950/10">
        
        {/* Chat Panel Header */}
        <div className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {/* Back button (Mobile view toggle) */}
            <button
              onClick={() => {
                setActiveConversationId(null);
                setSidebarOpen(true);
              }}
              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-655 dark:text-zinc-400 rounded-lg md:hidden shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Avatar Circle */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-950 font-bold text-sm">
              {isGroup ? <Users className="w-5 h-5" /> : chatTitle.slice(0, 2).toUpperCase()}
            </div>

            {/* Text details */}
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-white truncate max-w-[200px] md:max-w-md">
                {chatTitle}
              </h2>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium truncate mt-0.5">
                {isGroup ? `${activeConversation.participants.length} participants` : activeConversation.participant.phone}
              </p>
            </div>
          </div>

          {/* Action Header Button */}
          {isGroup && (
            <button
              onClick={() => setShowGroupSettings(!showGroupSettings)}
              className={`p-2 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-555 dark:text-zinc-400 rounded-xl transition-all cursor-pointer ${
                showGroupSettings ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400' : ''
              }`}
              title="Group Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Message Area */}
        <div className="flex-1 min-h-0 overflow-hidden relative flex flex-col">
          <div
            ref={scrollViewportRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scroll-smooth"
            style={{ overflowAnchor: 'auto' }} // Native scroll-anchoring behavior
          >
            {/* Top pagination state loader */}
            {isFetchingNextPage && (
              <div className="flex justify-center py-2">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
              </div>
            )}

            {isHistoryPending ? (
              /* Message Load Skeleton */
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, idx) => {
                  const alignLeft = idx % 2 === 0;
                  return (
                    <div key={idx} className={`flex ${alignLeft ? 'justify-start' : 'justify-end'} animate-pulse`}>
                      <div className={`max-w-[70%] h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-850 w-48`} />
                    </div>
                  );
                })}
              </div>
            ) : isHistoryError ? (
              <div className="p-6 text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
                <p className="text-sm text-zinc-550">Failed to load message history</p>
                <button
                  onClick={() => refetchHistory()}
                  className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Retry
                </button>
              </div>
            ) : chronologicalMessages.length === 0 ? (
              /* Chat empty state */
              <div className="h-full flex flex-col items-center justify-center text-center p-8 select-none text-zinc-400">
                <MessageSquare className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-2" />
                <p className="text-sm font-semibold">No messages yet</p>
                <p className="text-xs text-zinc-550 mt-1 max-w-[200px]">
                  Send a message to initialize this conversation.
                </p>
              </div>
            ) : (
              /* Render Messages List with grouping dates */
              (() => {
                let lastDateStr = '';
                return chronologicalMessages.map((msg: Message) => {
                  const isMe = msg.sender === currentUser?._id;
                  
                  // Compute date separator
                  const msgDate = new Date(msg.createdAt);
                  const dateStr = msgDate.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
                  const showSeparator = dateStr !== lastDateStr;
                  lastDateStr = dateStr;

                  // Find sender name for group chats
                  let senderName = '';
                  if (isGroup && !isMe) {
                    const participant = activeConversation.participants.find((p) => p._id === msg.sender);
                    senderName = participant ? participant.name : 'Unknown User';
                  }

                  const msgTime = msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

                  return (
                    <React.Fragment key={msg._id}>
                      {showSeparator && (
                        <div className="flex justify-center my-6 select-none">
                          <span className="bg-zinc-200/60 dark:bg-zinc-800/80 text-[10px] font-bold text-zinc-550 dark:text-zinc-450 px-3 py-1 rounded-full uppercase tracking-wider">
                            {dateStr}
                          </span>
                        </div>
                      )}
                      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-xs flex flex-col ${
                            isMe
                              ? 'bg-indigo-600 dark:bg-indigo-600 text-white rounded-br-none'
                              : 'bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-none'
                          }`}
                        >
                          {senderName && (
                            <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 mb-1 leading-none">
                              {senderName}
                            </span>
                          )}
                          <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{msg.text}</p>
                          <span
                            className={`text-[9px] mt-1.5 self-end leading-none font-medium ${
                              isMe ? 'text-indigo-200/80' : 'text-zinc-450 dark:text-zinc-500'
                            }`}
                          >
                            {msgTime}
                          </span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                });
              })()
            )}
          </div>

          {/* WhatsApp style floating unread arrow badge */}
          {showNewMessagesBtn && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-4 right-6 flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 animate-bounce z-10"
              title="New Messages Below"
            >
              <ChevronDown className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* Input Bar Footer */}
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shrink-0">
          <form onSubmit={handleSend} className="flex items-end gap-2 max-w-5xl mx-auto">
            <div className="flex-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl px-4 py-2.5 border border-transparent focus-within:border-zinc-300 dark:focus-within:border-zinc-800 flex items-center gap-2">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                rows={1}
                className="flex-1 max-h-24 bg-transparent border-0 outline-none text-sm text-zinc-900 dark:text-white placeholder-zinc-500 resize-none font-sans scrollbar-none py-0.5 leading-relaxed"
                style={{ height: 'auto' }}
              />
            </div>
            
            <button
              type="submit"
              disabled={!messageText.trim() || sendMessageMutation.isPending}
              className="w-10 h-10 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-450 dark:disabled:text-zinc-650 text-white flex items-center justify-center shadow-md hover:shadow-indigo-500/20 shrink-0 cursor-pointer active:scale-95 disabled:scale-100 transition-all"
            >
              {sendMessageMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4 translate-x-[1px] -translate-y-[1px]" />
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Drawer Sliding Group Settings Info Panel */}
      {isGroup && showGroupSettings && (
        <div className="w-full md:w-80 h-full border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col shrink-0 absolute md:relative inset-0 z-40">
          {/* Header */}
          <div className="h-16 border-b border-zinc-200 dark:border-zinc-800 px-4 flex items-center justify-between shrink-0 bg-zinc-50 dark:bg-zinc-900/40">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Group Information</h3>
            </div>
            <button
              onClick={() => setShowGroupSettings(false)}
              className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Settings scrollable area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {groupActionError && (
              <div className="flex items-start gap-2 bg-red-950/40 border border-red-900/50 text-red-200 rounded-xl p-3 text-xs">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="flex-1">{groupActionError}</span>
                <button onClick={() => setGroupActionError(null)} className="text-red-400 hover:text-white cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Group Name editing */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Group Subject
              </label>
              {isEditingName ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-white outline-none"
                    placeholder="New name..."
                  />
                  <button
                    disabled={renameGroupMutation.isPending || !newGroupName.trim()}
                    onClick={() => renameGroupMutation.mutate(newGroupName)}
                    className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg cursor-pointer"
                  >
                    {renameGroupMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="p-2 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg text-zinc-400 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-900/20 rounded-xl border border-zinc-200/50 dark:border-zinc-850">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white truncate mr-2">
                    {activeConversation.name}
                  </span>
                  {isUserAdmin && (
                    <button
                      onClick={() => {
                        setNewGroupName(activeConversation.name);
                        setIsEditingName(true);
                      }}
                      className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Add Member Section (Admins Only) */}
            {isUserAdmin && (
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Add New Members
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search directory..."
                    value={memberSearchQuery}
                    onChange={(e) => setMemberSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-8 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-transparent rounded-lg text-xs outline-none"
                  />
                  {memberSearchQuery && (
                    <button onClick={() => setMemberSearchQuery('')} className="absolute right-2.5 top-2 text-zinc-400 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Sublist search matches */}
                {memberSearchQuery.trim() && (
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/30 max-h-40 overflow-y-auto divide-y divide-zinc-200 dark:divide-zinc-800">
                    {isSearchingMembers ? (
                      <div className="p-3 text-center text-xs text-zinc-555">Searching...</div>
                    ) : !memberSearchResults || memberSearchResults.length === 0 ? (
                      <div className="p-3 text-center text-xs text-zinc-500">No users found</div>
                    ) : (
                      memberSearchResults.map((user: User) => {
                        // Check if already in group
                        const isAlreadyMember = activeConversation.participants.some(
                          (p) => p._id === user._id
                        );
                        return (
                          <div
                            key={user._id}
                            className="p-2 flex items-center justify-between text-xs"
                          >
                            <div className="min-w-0 pr-2">
                              <div className="font-semibold text-zinc-900 dark:text-white truncate">{user.name}</div>
                              <div className="text-[9px] text-zinc-400 truncate">{user.phone}</div>
                            </div>
                            <button
                              disabled={isAlreadyMember || addParticipantMutation.isPending}
                              onClick={() => addParticipantMutation.mutate(user._id)}
                              className="p-1.5 bg-indigo-500/10 hover:bg-indigo-500 text-indigo-600 dark:text-indigo-400 hover:text-white disabled:bg-zinc-200 dark:disabled:bg-zinc-850 disabled:text-zinc-400 rounded-lg cursor-pointer transition-colors"
                            >
                              <UserPlus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Participants list */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Participants List
                </label>
                <span className="text-[10px] bg-zinc-200 dark:bg-zinc-800 text-zinc-550 px-1.5 py-0.5 rounded-full font-bold">
                  {activeConversation.participants.length}
                </span>
              </div>

              <div className="divide-y divide-zinc-100 dark:divide-zinc-850">
                {activeConversation.participants.map((member) => {
                  const isCurrentMemberAdmin = isMemberAdmin(member._id);
                  const isSelf = member._id === currentUser?._id;

                  return (
                    <div key={member._id} className="py-2.5 flex items-center justify-between gap-2">
                      <div className="min-w-0 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-550 dark:text-zinc-300 font-bold uppercase text-[10px] flex items-center justify-center shrink-0">
                          {member.name.slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                              {member.name} {isSelf && '(You)'}
                            </span>
                            {isCurrentMemberAdmin && (
                              <span title="Admin">
                                <Crown className="w-3 h-3 text-amber-500 shrink-0" />
                              </span>
                            )}
                          </div>
                          <span className="text-[9px] text-zinc-400 block truncate">{member.phone}</span>
                        </div>
                      </div>

                      {/* Participant contextual operations */}
                      <div className="flex gap-1">
                        {/* Promote to Admin Option (Admins Only, and only for non-admins) */}
                        {isUserAdmin && !isCurrentMemberAdmin && !isSelf && (
                          <button
                            disabled={promoteAdminMutation.isPending}
                            onClick={() => promoteAdminMutation.mutate(member._id)}
                            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-450 hover:text-amber-500 rounded transition-colors cursor-pointer"
                            title="Make Admin"
                          >
                            <Crown className="w-3.5 h-3.5" />
                          </button>
                        )}
                        
                        {/* Remove Member Option */}
                        {isSelf ? (
                          /* Leave button for oneself */
                          <button
                            disabled={removeParticipantMutation.isPending}
                            onClick={() => {
                              if (confirm('Leave this group?')) {
                                removeParticipantMutation.mutate(member._id);
                              }
                            }}
                            className="p-1 hover:bg-red-50 dark:hover:bg-red-950/30 text-zinc-450 hover:text-red-550 rounded transition-colors cursor-pointer"
                            title="Leave Group"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          /* Admin can remove others */
                          isUserAdmin && (
                            <button
                              disabled={removeParticipantMutation.isPending}
                              onClick={() => {
                                if (confirm(`Remove ${member.name} from the group?`)) {
                                  removeParticipantMutation.mutate(member._id);
                                }
                              }}
                              className="p-1 hover:bg-red-50 dark:hover:bg-red-950/30 text-zinc-450 hover:text-red-550 rounded transition-colors cursor-pointer"
                              title="Remove Participant"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
