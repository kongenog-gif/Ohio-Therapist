'use client';

import { motion } from 'framer-motion';
import { Message as MessageType } from '@/types';

interface MessageProps {
    message: MessageType;
    index: number;
}

export default function Message({ message, index }: MessageProps) {
    const isUser = message.role === 'user';
    const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: Math.min(index * 0.05, 0.3)
            }}
            className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div className={`flex items-start max-w-[85%] md:max-w-[70%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

                {/* Avatar with Status Glow */}
                <div className="relative flex-shrink-0 group">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 overflow-hidden ${isUser
                            ? 'bg-gradient-to-br from-indigo-500 to-indigo-700'
                            : 'bg-white/5 border border-white/10 glass'
                            }`}
                    >
                        {isUser ? (
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        ) : (
                            <img src="/Logo.jpg" alt="Session Assistant" className="w-full h-full object-cover p-1.5 opacity-80" />
                        )}
                    </motion.div>
                    {!isUser && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#020617] rounded-full shadow-glow-sm" />
                    )}
                </div>

                {/* Message Content Container */}
                <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                        className={`relative px-6 py-4 rounded-[1.5rem] shadow-xl text-[15px] leading-relaxed transition-all duration-300 ${isUser
                            ? 'bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-tr-none'
                            : 'glass border-white/5 text-white/90 rounded-tl-none'
                            }`}
                    >
                        {/* Contextual Tag for Assistant */}
                        {!isUser && message.intent && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="block text-[9px] uppercase tracking-[0.2em] text-indigo-400 font-bold mb-2 opacity-60"
                            >
                                {message.intent.replace(/_/g, ' ')}
                            </motion.span>
                        )}

                        <p className="whitespace-pre-wrap selection:bg-white/20">{message.content}</p>

                        {/* Subtle Aura for Assistant Messages */}
                        {!isUser && (
                            <div className="absolute -inset-1 bg-indigo-500/5 blur-xl -z-10 rounded-3xl" />
                        )}
                    </div>

                    {/* Metadata Footer */}
                    <div className={`flex items-center gap-3 mt-2 px-1 text-[10px] uppercase tracking-widest font-medium opacity-30 group-hover:opacity-60 transition-opacity`}>
                        <span>{timestamp}</span>
                        {message.emotion && (
                            <>
                                <span className="w-1 h-1 bg-white/40 rounded-full" />
                                <span className="text-indigo-400">{message.emotion}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
