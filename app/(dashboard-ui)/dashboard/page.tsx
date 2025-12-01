"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Sidebar from "@/component/sidebar";
import { menuContent } from "@/utils/item";
import TopNavbar from "@/component/navbar";

export default function DashboardPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "orange" | "blue" | "green">("blue");

  // Apply theme to <body>
  useEffect(() => {
    const classes = ["light", "dark", "theme-orange", "theme-blue", "theme-green"];
    document.body.classList.remove(...classes);

    const themeClass =
      theme === "light" ? "light" :
        theme === "dark" ? "dark" :
          `theme-${theme}`;

    document.body.classList.add(themeClass);
  }, [theme]);

  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const [activeApp, setActiveApp] = useState("Dashboard");

  // Rename this to avoid conflict
  const bodyTheme = useSyncExternalStore(
    (callback) => {
      if (typeof document === "undefined") return () => { };

      const observer = new MutationObserver(callback);
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    },
    () => {
      if (typeof document === "undefined") return "light";

      if (document.body.classList.contains("dark")) return "dark";
      if (document.body.classList.contains("theme-orange")) return "orange";
      if (document.body.classList.contains("theme-blue")) return "blue";
      if (document.body.classList.contains("theme-green")) return "green";
      return "light";
    },
    () => "light"
  );

  return (
    <div className="flex h-screen bg-background text-foreground">

      <Sidebar
        theme={theme}
        activeApp={activeApp}
        setActiveApp={setActiveApp}
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />

      <main className="flex-1 overflow-y-auto p-10">
        <TopNavbar theme={theme} setTheme={setTheme} />

        <div className="max-w-7xl mx-auto py-5">
          <h1 className="text-xl font-bold mb-12 opacity-80">
            {activeApp} / {activeMenuItem}
          </h1>

          <div className="p-32 min-h-96 flex items-center justify-center backdrop-blur-sm transition-all duration-300">
            <div className="text-center">
              {menuContent[activeMenuItem] || (
                <p className="text-3xl opacity-50">Select a menu item</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
