import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "./components/layout/SiteHeader";
import { getCurrentUser } from "./lib/auth";
import type { CurrentUser } from "./lib/types";
import { UserProvider } from "./providers/UserProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Conspectus",
  description:
    "Conspectus helps you explore leaders, issues, and global movements with clean, structured intelligence.",
  icons: {
    icon: "/conspectus-logo.png",
    shortcut: "/conspectus-logo.png",
    apple: "/conspectus-logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser : CurrentUser | null = await getCurrentUser();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader currentUser={currentUser} />
        <UserProvider currentUser={currentUser}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
