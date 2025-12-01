"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [active, setActive] = useState("home");

  const menu = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link href="/">
          <span className="text-3xl font-extrabold text-white tracking-wide">
            Delex
          </span>
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {menu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.label.toLowerCase())}
              className={cn(
                "text-white/80 hover:text-orange-400 transition text-sm font-semibold",
                active === item.label.toLowerCase() && "text-orange-400"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
