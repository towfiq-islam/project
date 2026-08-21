'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { MessageSquare, Phone, User as UserIcon, Loader2, AlertCircle } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { authService } from '@/services/chatService';

// Schema validation for login
const loginSchema = z.object({
  phone: z
    .string()
    .min(8, 'Phone number must be at least 8 digits')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Phone must be in international format (e.g. +15550000001)'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { token, setToken, setUser } = useChatStore();
  const [apiError, setApiError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (token) {
      router.push('/chat');
    }
  }, [token, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      name: '',
    },
  });

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      // 1. Authenticate / Register
      const { token: jwtToken } = await authService.login(values.phone, values.name);
      setToken(jwtToken);
      
      // 2. Fetch profile data using token
      // Wait: we need to configure the Authorization header first.
      // Our api interceptor checks localStorage.setItem right inside setToken(jwtToken)
      // which runs synchronously.
      const userProfile = await authService.me();
      setUser(userProfile);
      return userProfile;
    },
    onSuccess: () => {
      router.push('/chat');
    },
    onError: (err: any) => {
      console.error('Login failed:', err);
      const errMsg =
        err.response?.data?.error?.message ||
        err.message ||
        'Failed to connect to the authentication server.';
      setApiError(errMsg);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setApiError(null);
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-radial from-indigo-950 via-zinc-950 to-black px-4">
      {/* Decorative background grids/blur circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/30 mb-4 animate-pulse">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Welcome to Aura Chat</h2>
          <p className="text-zinc-400 mt-2 text-sm">Enter your details to join or sign back in</p>
        </div>

        <div className="backdrop-blur-xl bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* API Errors */}
            {apiError && (
              <div className="flex items-start gap-3 bg-red-950/40 border border-red-900/50 text-red-200 rounded-xl p-4 text-sm">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Authentication Error</p>
                  <p className="text-red-300/90 mt-0.5">{apiError}</p>
                </div>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-semibold text-zinc-300 tracking-wide uppercase block">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <UserIcon className="w-4 h-4" />
                </span>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Ada Lovelace"
                  disabled={loginMutation.isPending}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950/40 border border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white placeholder-zinc-500 transition-all text-sm outline-none"
                  {...register('name')}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-400 font-medium mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-xs font-semibold text-zinc-300 tracking-wide uppercase block">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  id="phone"
                  type="tel"
                  placeholder="e.g. +15551234567"
                  disabled={loginMutation.isPending}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950/40 border border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white placeholder-zinc-500 transition-all text-sm outline-none"
                  {...register('phone')}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-400 font-medium mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-indigo-600/20 active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Launch Messenger'
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center text-xs text-zinc-500 mt-6">
          Secured with JSON Web Token session protocols.
        </p>
      </div>
    </div>
  );
}
