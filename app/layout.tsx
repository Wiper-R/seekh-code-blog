import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import "./article.scss";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seekh Code",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "bg-[#2A2A2A] bg-gradient-to-b bg-fixed from-[#232323] to-gray-950 overflow-auto"
        )}
      >
        <SessionProvider>{children}</SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
