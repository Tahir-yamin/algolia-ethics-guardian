import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "AI Ethics & Goal Alignment Guardian",
    description: "Real-time auditing of product specifications and AI behavior using Algolia Agent Studio.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased overflow-hidden">
                {children}
            </body>
        </html>
    );
}
