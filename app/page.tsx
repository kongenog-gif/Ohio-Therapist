'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroPage from '@/components/IntroPage';
import ChatInterface from '@/components/ChatInterface';

export default function Home() {
    const [showIntro, setShowIntro] = useState(true);

    const handleIntroComplete = () => {
        setShowIntro(false);
    };

    return (
        <main className="relative min-h-screen">
            <AnimatePresence mode="wait">
                {showIntro ? (
                    <motion.div
                        key="intro"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <IntroPage onComplete={handleIntroComplete} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <ChatInterface />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
