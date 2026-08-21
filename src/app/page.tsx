'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Zap,
  Users,
  Smartphone,
  Shield,
  ArrowRight,
  Send,
  Sparkles,
  MousePointer,
  CheckCircle,
  Menu,
  X,
  Keyboard,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'direct' | 'group' | 'scroll'>('direct');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulated live message ticker for the chat preview mockup
  const [simulatedMessages, setSimulatedMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'Margaret', text: 'Hey teams, did we push the latest Tailwind v4 configurations?', time: '10:42 AM' },
    { sender: 'Bob', text: 'Yes! Fully deployed. Response times are under 30ms now.', time: '10:43 AM' },
  ]);

  useEffect(() => {
    const texts = [
      { sender: 'Alice (You)', text: 'Awesome! Realtime sockets look extremely responsive.', time: '10:44 AM' },
      { sender: 'Margaret', text: 'Agreed! Check the smart scroll on mobile too.', time: '10:45 AM' },
      { sender: 'System', text: 'Margaret Hamilton promoted Bob Peer to admin.', time: '10:46 AM' }
    ];

    const initialMessages = [
      { sender: 'Margaret', text: 'Hey teams, did we push the latest Tailwind v4 configurations?', time: '10:42 AM' },
      { sender: 'Bob', text: 'Yes! Fully deployed. Response times are under 30ms now.', time: '10:43 AM' },
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < texts.length) {
        const nextMsg = texts[currentIdx];
        setSimulatedMessages((prev) => [...prev, nextMsg]);
        currentIdx++;
      } else {
        // Reset to initial state to loop the preview after a tick delay
        setSimulatedMessages(initialMessages);
        currentIdx = 0;
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative overflow-hidden selection:bg-indigo-600 selection:text-white">
      {/* Decorative Blur Circles */}
      <div className="absolute top-[-300px] left-[-200px] w-[800px] h-[800px] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-300px] right-[-200px] w-[800px] h-[800px] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/70 border-b border-zinc-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <MessageSquare className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Aura Chat
          </span>
        </div>

        {/* Desktop Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#preview" className="hover:text-white transition-colors">Product Preview</a>
          <a href="#smart-scroll" className="hover:text-white transition-colors">Smart Scroll</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-sm font-bold text-white rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-102 active:scale-98"
          >
            Launch Messenger
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-zinc-400 hover:text-white p-1 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-zinc-900 border-b border-zinc-800 p-6 z-40 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4 text-zinc-400 text-sm font-semibold">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Features</a>
              <a href="#preview" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Product Preview</a>
              <a href="#smart-scroll" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Smart Scroll</a>
            </div>
            <div className="h-px bg-zinc-800 w-full" />
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 border border-zinc-800 text-zinc-300 rounded-xl text-sm font-bold"
              >
                Sign In
              </Link>
              <Link
                href="/chat"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold"
              >
                Launch Messenger
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-16 md:pt-32 md:pb-24 max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-900/60 text-indigo-300 text-xs font-semibold mb-6 animate-pulse"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tailwind v4 & React Server Components Powered</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl"
        >
          Communication, Redefined in{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Real-Time
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-400 mt-6 text-base sm:text-lg max-w-2xl leading-relaxed"
        >
          Experience the lightning speed of Aura. A production-ready messaging platform built for teams with fluid 1-to-1 chats, group channels, and smart scroll memory.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md"
        >
          <Link
            href="/chat"
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] text-base"
          >
            Launch Live Chat
            <Send className="w-4.5 h-4.5" />
          </Link>
          <a
            href="#features"
            className="flex-1 flex items-center justify-center gap-2 py-4 border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-300 hover:text-white font-semibold rounded-2xl transition-all text-base"
          >
            Explore Features
          </a>
        </motion.div>
      </section>

      {/* Product Live Preview Mockup Section */}
      <section id="preview" className="px-6 py-12 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-zinc-900/40 border border-zinc-850 rounded-3xl shadow-2xl overflow-hidden aspect-video max-w-4xl mx-auto flex flex-col text-left"
        >
          {/* Mockup Topbar */}
          <div className="px-4 py-3 bg-zinc-950/80 border-b border-zinc-850 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-xs text-zinc-550 font-semibold tracking-wider uppercase flex items-center gap-1 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Aura Chat Sandbox Demo</span>
            </div>
            <div className="w-12" /> {/* spacer */}
          </div>

          {/* Mockup Workspace */}
          <div className="flex-1 flex overflow-hidden min-h-0 bg-zinc-900/20">
            {/* Mockup Sidebar */}
            <div className="w-48 bg-zinc-950/60 border-r border-zinc-850 flex-col hidden sm:flex">
              <div className="p-3 border-b border-zinc-850">
                <div className="h-7 bg-zinc-900 rounded-lg w-full" />
              </div>
              <div className="p-2 space-y-1.5">
                <div className="flex items-center gap-2 p-2 bg-indigo-950/30 border-l-2 border-indigo-500 text-indigo-200 rounded">
                  <Users className="w-4 h-4 shrink-0 text-indigo-400" />
                  <div className="min-w-0 flex-1">
                    <div className="h-3 bg-indigo-500/20 rounded w-16" />
                    <div className="h-2 bg-indigo-500/10 rounded w-12 mt-1" />
                  </div>
                </div>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded hover:bg-zinc-900/50">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 shrink-0" />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="h-3 bg-zinc-850 rounded w-12" />
                      <div className="h-2 bg-zinc-850 rounded w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mockup Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-950/20 relative">
              {/* Header */}
              <div className="h-12 border-b border-zinc-850 px-4 flex items-center justify-between shrink-0 bg-zinc-950/40">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-[10px]">
                    DG
                  </div>
                  <span className="text-xs font-bold text-white">Designers Guild</span>
                </div>
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-800" />
              </div>

              {/* Message scroll simulator */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {simulatedMessages.map((msg, idx) => {
                  if (!msg) return null;
                  const isMe = msg.sender?.includes('You');
                  return (
                    <motion.div
                      key={idx + (msg.text || '')}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl px-3 py-1.5 text-[11px] shadow ${
                          isMe
                            ? 'bg-indigo-600 text-white rounded-br-none'
                            : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-bl-none'
                        }`}
                      >
                        {!isMe && (
                          <div className="font-bold text-indigo-400 text-[9px] mb-0.5 leading-none">{msg.sender}</div>
                        )}
                        <div>{msg.text}</div>
                        <div className="text-[8px] text-zinc-500 mt-1 text-right">{msg.time}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mockup footer input */}
              <div className="p-3 border-t border-zinc-850 bg-zinc-950/60 flex items-center gap-2">
                <div className="flex-1 bg-zinc-900 rounded-lg h-8 border border-zinc-800" />
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Send className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="px-6 py-20 bg-zinc-950 relative border-y border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white">Engineered for Smooth Experiences</h2>
            <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
              No fake layouts. Built from scratch with an active API connection, type-safety, and real-time state hooks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-850/60 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 mb-6">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">WebSocket Realtime Engine</h3>
              <p className="text-zinc-400 text-xs mt-3 leading-relaxed">
                Connects directly to Socket.io servers. Incoming messages seamlessly sync and integrate into cache models without page reloads.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-850/60 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20 mb-6">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Ad-hoc Group Admin Panel</h3>
              <p className="text-zinc-400 text-xs mt-3 leading-relaxed">
                Start groups with 3+ members instantly. Rename channels, promote users to admins, or leave groups securely using reactive forms.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-850/60 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 mb-6">
                <Keyboard className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Keyboard Shortcuts & Access</h3>
              <p className="text-zinc-400 text-xs mt-3 leading-relaxed">
                Press Enter to send, Shift + Enter for multiline messages, and enjoy smooth keyboard navigation styled with custom themes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Messaging Showcases (Tabbed Interaction) */}
      <section id="smart-scroll" className="px-6 py-20 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Showcase Explanation Column */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              A Messaging Interface Built with Care
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We focus on standard communication behaviors that match modern production workflows. Select a feature tab to see the details.
            </p>

            <div className="space-y-3">
              {[
                { id: 'direct', label: '1-to-1 Conversations', desc: 'Find users instantly by phone or name and launch direct message chats.' },
                { id: 'group', label: 'Collaborative Groups', desc: 'Create channels, rename titles, promote admins, or leave groups.' },
                { id: 'scroll', label: 'Smart Auto-Scroll Logic', desc: 'Prevents scroll jumps when browsing history; floats a new message banner.' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-indigo-950/20 border-indigo-650 text-white shadow-lg'
                      : 'border-zinc-850 hover:border-zinc-700 text-zinc-400'
                  }`}
                >
                  <span className="font-bold text-sm block">{tab.label}</span>
                  {activeTab === tab.id && <span className="text-xs text-zinc-400 mt-1 block">{tab.desc}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Screen Showcase Column */}
          <div className="lg:col-span-7 backdrop-blur-xl bg-zinc-900/20 border border-zinc-850 p-6 rounded-3xl shadow-xl space-y-4">
            <AnimatePresence mode="wait">
              {activeTab === 'direct' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4 text-left"
                >
                  <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
                    <span className="text-xs font-bold text-zinc-450 uppercase">1-to-1 Lookup Preview</span>
                    <span className="text-[10px] bg-green-500/10 text-green-400 font-semibold px-2 py-0.5 rounded-full border border-green-500/20">Operational</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-zinc-400">Search Box Input: &quot;Ada&quot;</div>
                    <div className="bg-zinc-950/60 rounded-xl p-3 border border-zinc-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Ada Lovelace</div>
                        <div className="text-[10px] text-zinc-500">+15551234567</div>
                      </div>
                      <button className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-lg">Chat</button>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Direct conversations verify if a chat exists between users, returning historical texts instantly.
                  </p>
                </motion.div>
              )}

              {activeTab === 'group' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4 text-left"
                >
                  <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
                    <span className="text-xs font-bold text-zinc-450 uppercase">Group Admin Preview</span>
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-semibold px-2 py-0.5 rounded-full border border-indigo-500/20">Operational</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-zinc-400">Active Group: Designers & Engineers</div>
                    <div className="bg-zinc-950/60 rounded-xl p-3 border border-zinc-800 space-y-2">
                      <div className="flex justify-between items-center text-xs text-zinc-350">
                        <span>Participants (3)</span>
                        <span className="text-[10px] text-amber-500 font-bold">Admin Privileges</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] py-1 border-b border-zinc-900">
                          <span className="font-semibold">Alice (You) - Creator</span>
                          <span className="text-amber-500">Owner</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] py-1 border-b border-zinc-900">
                          <span>Bob Peer</span>
                          <button className="text-indigo-400 font-bold">Promote Admin</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Admins have total control over membership, including promoting others, renaming, or leaving groups.
                  </p>
                </motion.div>
              )}

              {activeTab === 'scroll' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4 text-left"
                >
                  <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
                    <span className="text-xs font-bold text-zinc-450 uppercase">Scroll Anchors Preview</span>
                    <span className="text-[10px] bg-violet-500/10 text-violet-400 font-semibold px-2 py-0.5 rounded-full border border-violet-500/20">Operational</span>
                  </div>
                  <div className="space-y-3 relative overflow-hidden bg-zinc-950/60 border border-zinc-800 rounded-xl p-4 h-32 flex flex-col justify-end">
                    <div className="space-y-1.5 opacity-60">
                      <div className="bg-zinc-900 rounded p-1 text-[9px] w-24">Message history...</div>
                      <div className="bg-zinc-900 rounded p-1 text-[9px] w-32">Browse old messages</div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <button className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg shadow-indigo-600/30">
                        <ChevronDown className="w-3 h-3" />
                        <span>New Messages</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Prevents scroll displacement when reading old history. The floating banner scrolls you back down instantly when clicked.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Responsive Breakpoints Showcase Section */}
      <section className="px-6 py-20 bg-zinc-900/20 border-t border-zinc-900 relative">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">Responsive Mobile-First Canvas</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We leverage CSS Flex grids to build a responsive interface. On mobile, the app defaults to the channels sidebar, switching with hardware-accelerated drawer slides on conversation selection.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-400" />
                <span>Mobile Sidebar Drawer navigation toggle</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-400" />
                <span>Desktop double-panel split viewport</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center w-full">
            <div className="relative border-4 border-zinc-800 rounded-3xl bg-zinc-950 p-3 shadow-2xl w-60 h-[480px] select-none flex flex-col">
              <div className="w-20 h-4 bg-zinc-800 rounded-full mx-auto mb-2" />
              <div className="flex-1 border border-zinc-900 bg-zinc-900/40 rounded-2xl p-2.5 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center gap-1.5 border-b border-zinc-800/80 pb-2">
                  <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[10px] font-bold text-white">Margaret Hamilton</span>
                </div>
                <div className="flex-1 py-4 flex flex-col justify-end space-y-2">
                  <div className="bg-zinc-800 text-zinc-250 p-1.5 text-[8px] rounded-lg w-2/3 leading-normal">
                    Let&apos;s push to staging.
                  </div>
                  <div className="bg-indigo-650 text-white p-1.5 text-[8px] rounded-lg self-end w-2/3 leading-normal">
                    Done! Connected via websocket.
                  </div>
                </div>
                <div className="bg-zinc-950 rounded h-6 w-full border border-zinc-850" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 text-center max-w-4xl mx-auto w-full relative">
        <div className="backdrop-blur-xl bg-gradient-to-tr from-indigo-950/40 to-violet-950/40 border border-zinc-850 p-10 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-500/10 blur-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-violet-600/10 blur-xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Ready to Connect Your Teams?
          </h2>
          <p className="text-zinc-400 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Experience realtime collaboration with group hierarchies, admin controls, and scroll anchored chat histories.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center max-w-sm mx-auto">
            <Link
              href="/chat"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-zinc-950 hover:bg-zinc-150 font-bold rounded-xl transition-all hover:scale-102 active:scale-98 text-sm"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto px-6 py-8 border-t border-zinc-900 text-center text-xs text-zinc-550 dark:text-zinc-650 bg-zinc-950">
        <p>&copy; {new Date().getFullYear()} Aura Chat Inc. Built with Next.js, TanStack Query, and Socket.io.</p>
      </footer>
    </div>
  );
}
