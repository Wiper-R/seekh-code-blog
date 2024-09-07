import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import "./article.scss";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "min-h-screen h-full bg-[#2A2A2A] flex flex-col  bg-gradient-to-b from-[#232323] to-gray-950"
        )}
      >
        <Navbar />
        <div className="h-full">{children}</div>
      </body>
    </html>
  );
}
