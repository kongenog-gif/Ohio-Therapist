'use client';

import { ThemeProvider } from "@/lib/theme-context";
import ThemeToggle from "@/components/ThemeToggle";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            {/* Galaxy Background */}
            <div className="galaxy-bg" />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Main Content */}
            {children}
        </ThemeProvider>
    );
}
