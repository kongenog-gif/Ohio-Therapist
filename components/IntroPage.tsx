'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface IntroPageProps {
    onComplete: () => void;
}

export default function IntroPage({ onComplete }: IntroPageProps) {
    const [progress, setProgress] = useState(0);
    const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1.5;
            });
        }, 45);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const timer = setTimeout(() => {
                setIsExiting(true);
                setTimeout(onComplete, 1000);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [progress, onComplete]);

    const handleSkip = () => {
        setIsExiting(true);
        setTimeout(onComplete, 800);
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                    transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#020617]"
                >
                    {/* Advanced Background Layers */}
                    <div className="absolute inset-0 z-0">
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                background: [
                                    'radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 40%)',
                                    'radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)',
                                    'radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 40%)',
                                ],
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        />
                        <div className="absolute inset-0 galaxy-bg opacity-40 shadow-inner" />
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-8">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative mb-16"
                        >
                            {/* Cinematic Logo Treatment */}
                            <div className="relative group">
                                <motion.div
                                    className="absolute -inset-8 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full opacity-50 transition-opacity duration-1000 group-hover:opacity-100"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />

                                <h1 className="text-[5rem] md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter leading-none mb-2 font-display">
                                    <span className="gradient-text drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">Ohio Therapy</span>
                                </h1>

                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 1, duration: 1.5, ease: 'circOut' }}
                                />

                                <motion.p
                                    initial={{ opacity: 0, letterSpacing: '0.5em' }}
                                    animate={{ opacity: 1, letterSpacing: '0.25em' }}
                                    transition={{ delay: 1.5, duration: 1.5 }}
                                    className="text-center mt-6 text-xl md:text-2xl text-indigo-300 font-light uppercase"
                                >
                                    The Future of Wellness
                                </motion.p>
                            </div>
                        </motion.div>

                        {/* Loading Indicator */}
                        <div className="w-full max-w-sm space-y-4">
                            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden blur-[0.5px]">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                                    initial={{ x: '-100%' }}
                                    style={{ width: '100%', x: `${progress - 100}%` }}
                                />
                            </div>

                            <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/30 font-display">
                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                                    Synchronizing
                                </motion.span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                        </div>

                        {/* Skip Option */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: progress > 20 ? 1 : 0 }}
                            whileHover={{ scale: 1.05, color: '#fff' }}
                            onClick={handleSkip}
                            className="mt-20 px-10 py-3 text-[11px] uppercase tracking-[0.3em] text-white/20 border border-white/10 rounded-full backdrop-blur-md transition-all duration-500 hover:border-white/30"
                        >
                            Skip Introduction
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
