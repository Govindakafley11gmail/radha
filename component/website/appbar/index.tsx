"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

const navItems = ["Home", "About", "Products", "Contact Us", "Blog"];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Detect current page from pathname
  const getCurrentPage = () => {
    if (pathname === "/") return "Home";
    if (pathname === "/about") return "About";
    if (pathname === "/products") return "Products";
    if (pathname === "/contact") return "Contact Us";
    if (pathname === "/blog") return "Blog";
    return "";
  };

  const currentPage = getCurrentPage();

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const headerHeight = header.offsetHeight;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > headerHeight * 0.5);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Proper route mapping (fix for "Contact Us")
  const handleNavClick = (nav: string) => {
    const routeMap: Record<string, string> = {
      Home: "/",
      About: "/about",
      Products: "/products",
      "Contact Us": "/contact",
      Blog: "/blog",
    };

    router.push(routeMap[nav]);
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-500 
        bg-white ${scrolled ? "shadow-md" : "shadow-sm"} 
      `}
    >
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-900 cursor-pointer" onClick={() => router.push("/")}>
        Radha<span className="text-orange-500">.</span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden lg:flex gap-8 text-sm font-medium">
        {navItems.map((nav) => (
          <div
            key={nav}
            onClick={() => handleNavClick(nav)}
            className={`
              relative cursor-pointer pb-2 transition-colors duration-300
              ${
                nav === currentPage
                  ? "text-orange-500"
                  : "text-gray-700 hover:text-gray-900"
              }
            `}
          >
            {nav}

            {/* Underline */}
            <span
              className={`
                absolute left-0 bottom-0 h-[2px] w-full bg-orange-500 origin-left transform transition-transform duration-300 ease-out
                ${
                  nav === currentPage
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }
              `}
            />
          </div>
        ))}
      </nav>

      {/* CTA Button */}
      <motion.div whileTap={{ scale: 0.97 }}>
        <Button className="text-center rounded-full bg-orange-500 px-6 py-2.5 font-medium text-white hover:bg-orange-600 transition" onClick={() => router.push("/login")}  >
          Login
        </Button>
      </motion.div>
    </motion.header>
  );
}