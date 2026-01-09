'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Message from './Message';
import { Message as MessageType } from '@/types';
import { getReply, getWelcomeMessage } from '../lib/session';
import { getInternalLogic } from '../lib/logic';

export default function ChatInterface() {
    const [messages, setMessages] = useState<MessageType[]>([
        {
            id: '1',
            role: 'assistant',
            content: getWelcomeMessage(),
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: MessageType = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Reset textarea height
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
        }

        // Simulate sophisticated thinking delay
        const delay = 1200 + Math.random() * 1500;
        setTimeout(() => {
            const response = getReply(userMessage.content);

            const assistantMessage: MessageType = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.message,
                timestamp: new Date(),
                emotion: response.emotion,
                intent: response.intent,
            };

            setMessages(prev => [...prev, assistantMessage]);
            setIsLoading(false);
        }, delay);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-transparent">
            <div className="galaxy-bg" />

            {/* Premium Header */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="glass border-b border-white/5 backdrop-blur-2xl sticky top-0 z-40"
            >
                <div className="max-w-5xl mx-auto px-8 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-700/20 border border-white/10 flex items-center justify-center shadow-lg overflow-hidden group"
                            >
                                <img src="/Logo.jpg" className="w-full h-full object-cover p-2 opacity-80 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                            <div>
                                <h1 className="text-2xl font-bold font-display tracking-tight text-white/90">Ohio Therapy</h1>
                                <div className="flex items-center space-x-2 mt-0.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-medium">Session Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="hidden md:block h-8 w-px bg-white/10" />
                            <motion.button
                                whileHover={{ opacity: 1 }}
                                className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-medium hover:text-white transition-colors"
                                onClick={() => setMessages([{ id: 'reset', role: 'assistant', content: getWelcomeMessage(), timestamp: new Date() }])}
                            >
                                Clear History
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Advanced Message Scroll Area */}
            <main className="flex-1 overflow-y-auto px-6 py-12 scroll-smooth">
                <div className="max-w-4xl mx-auto space-y-10">
                    <AnimatePresence mode="popLayout">
                        {messages.map((message, index) => (
                            <Message key={message.id} message={message} index={index} />
                        ))}
                    </AnimatePresence>

                    {/* Cinematic Typing Indicator */}
                    <AnimatePresence>
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex items-center space-x-4 mb-8"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <div className="w-5 h-5 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                                </div>
                                <div className="glass px-6 py-4 rounded-2xl rounded-tl-sm border-white/5 shadow-lg">
                                    <div className="flex space-x-1.5 items-center">
                                        <span className="typing-dot" />
                                        <span className="typing-dot" />
                                        <span className="typing-dot" />
                                        <span className="ml-2 text-[10px] uppercase tracking-widest text-indigo-300/60 font-medium">Analyzing...</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </main>

            {/* Unified Command Center Input */}
            <footer className="relative z-40 pb-10 pt-4 px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="relative group"
                    >
                        {/* Ambient Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />

                        <div className="relative glass-card border-white/10 p-2 shadow-2xl flex items-end gap-3">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Describe your feelings..."
                                className="flex-1 max-h-60 min-h-[56px] px-6 py-4 bg-transparent text-white/90 placeholder-white/20 resize-none focus:outline-none text-base leading-relaxed"
                                rows={1}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = 'auto';
                                    target.style.height = `${target.scrollHeight}px`;
                                }}
                            />

                            <motion.button
                                whileHover={input.trim() ? { scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' } : {}}
                                whileTap={input.trim() ? { scale: 0.95 } : {}}
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className={`flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${input.trim()
                                    ? 'bg-indigo-600 text-white shadow-lg'
                                    : 'bg-white/5 text-white/10 cursor-not-allowed'
                                    }`}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <svg className="w-6 h-6 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-6 flex justify-center items-center space-x-6 text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium"
                    >
                        <span>End-to-end Encrypted</span>
                        <span className="w-1 h-1 bg-white/10 rounded-full" />
                        <span>Professional Guidance</span>
                        <span className="w-1 h-1 bg-white/10 rounded-full" />
                        <span>Not a Crisis Tool</span>
                    </motion.div>
                </div>
            </footer>
        </div>
    );
}
