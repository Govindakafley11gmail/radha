"use client";
import { useState, useEffect } from "react";
import { Maven_Pro } from "next/font/google";
import Sidebar from "@/component/sidebar";
import TopNavbar from "@/component/navbar";
import "./globals.css";
import Header from "@/component/website/appbar";
import { usePathname } from "next/navigation";

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-maven-pro",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); 
  const hideHeaderPaths = ["/dashboard"];
  const shouldHideHeader = hideHeaderPaths.some(path =>
    pathname.startsWith(path)
  );
  return (
    <html lang="en">
      <body className={`${mavenPro.variable} flex flex-col h-screen font-sans`}>

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-background text-foreground">
            {!shouldHideHeader && <Header />}
            <div className="">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}