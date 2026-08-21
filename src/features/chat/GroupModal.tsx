'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, X, Users, Check, Loader2, Plus, AlertCircle } from 'lucide-react';
import { userService, conversationService } from '@/services/chatService';
import { useDebounce } from '@/hooks/useDebounce';
import { User } from '@/types/chat';

interface GroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (groupId: string) => void;
}

export default function GroupModal({ isOpen, onClose, onSuccess }: GroupModalProps) {
  const queryClient = useQueryClient();
  const [groupName, setGroupName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 400);

  // Search users query
  const { data: searchResults, isPending: isSearching } = useQuery({
    queryKey: ['users', 'search', 'group', debouncedSearch],
    queryFn: () => userService.search(debouncedSearch),
    enabled: debouncedSearch.trim().length > 0,
  });

  // Create group mutation
  const createGroupMutation = useMutation({
    mutationFn: async () => {
      if (!groupName.trim()) {
        throw new Error('Group name is required');
      }
      if (selectedUsers.length < 2) {
        throw new Error('A group needs at least 3 members (you + 2 participants)');
      }
      const participantIds = selectedUsers.map((u) => u._id);
      return conversationService.createGroup(groupName.trim(), participantIds);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      // Reset state
      setGroupName('');
      setSearchQuery('');
      setSelectedUsers([]);
      setErrorMsg(null);
      onSuccess(data._id);
      onClose();
    },
    onError: (err: any) => {
      const msg = err.response?.data?.error?.message || err.message || 'Failed to create group';
      setErrorMsg(msg);
    },
  });

  if (!isOpen) return null;

  const toggleUserSelection = (user: User) => {
    setErrorMsg(null);
    if (selectedUsers.some((u) => u._id === user._id)) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== userId));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Create Group Chat</h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Area */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {errorMsg && (
            <div className="flex items-start gap-2.5 bg-red-950/40 border border-red-900/50 text-red-200 rounded-xl p-3 text-sm">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Group Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
              Group Subject / Name
            </label>
            <input
              type="text"
              placeholder="e.g. Design Sync"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-800 focus:border-indigo-500 rounded-xl text-white text-sm outline-none transition-colors"
            />
          </div>

          {/* Selected Members */}
          {selectedUsers.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                Selected Participants ({selectedUsers.length})
              </label>
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-1 bg-zinc-950/30 rounded-xl border border-zinc-850">
                {selectedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-1 bg-indigo-950/80 border border-indigo-900/60 text-indigo-200 text-xs px-2.5 py-1 rounded-full"
                  >
                    <span>{user.name}</span>
                    <button
                      type="button"
                      onClick={() => removeUser(user._id)}
                      className="hover:bg-indigo-900/50 rounded-full p-0.5 transition-colors cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Members */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
              Add Group Members
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/60 border border-zinc-800 focus:border-indigo-500 rounded-xl text-white text-sm outline-none transition-colors"
              />
            </div>

            {/* User Search Results */}
            <div className="border border-zinc-850 rounded-xl overflow-hidden bg-zinc-950/20 max-h-48 overflow-y-auto">
              {searchQuery.trim().length === 0 ? (
                <div className="p-4 text-center text-xs text-zinc-500">
                  Search for users to add them to the group
                </div>
              ) : isSearching ? (
                <div className="flex items-center justify-center gap-2 p-6 text-sm text-zinc-400">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                  Searching...
                </div>
              ) : !searchResults || searchResults.length === 0 ? (
                <div className="p-6 text-center text-sm text-zinc-500">No users found</div>
              ) : (
                <div className="divide-y divide-zinc-850">
                  {searchResults.map((user) => {
                    const isSelected = selectedUsers.some((u) => u._id === user._id);
                    return (
                      <button
                        key={user._id}
                        type="button"
                        onClick={() => toggleUserSelection(user)}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-zinc-800/40 transition-colors cursor-pointer"
                      >
                        <div>
                          <div className="font-medium text-sm text-white">{user.name}</div>
                          <div className="text-xs text-zinc-400">{user.phone}</div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-indigo-600 border-indigo-600 text-white'
                              : 'border-zinc-700 hover:border-zinc-500'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-zinc-800 flex justify-end gap-3 bg-zinc-900/80">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl text-sm transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={createGroupMutation.isPending || selectedUsers.length < 2 || !groupName.trim()}
            onClick={() => createGroupMutation.mutate()}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-zinc-800 disabled:to-zinc-800 text-white disabled:text-zinc-500 font-semibold rounded-xl text-sm transition-all cursor-pointer"
          >
            {createGroupMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Create Group ({selectedUsers.length + 1}/10)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
