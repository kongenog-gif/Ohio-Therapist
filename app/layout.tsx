import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Ohio Therapy - Your Personal Wellness Companion",
    description: "A compassionate companion for mental wellness. Experience CBT-based support with a beautiful, calming interface designed for your wellbeing.",
    keywords: ["therapy", "mental health", "wellness", "mindfulness", "CBT", "Ohio Therapy"],
    authors: [{ name: "Ohio Therapy" }],
    icons: {
        icon: '/Logo.jpg',
        apple: '/Logo.jpg',
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#6366f1",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
