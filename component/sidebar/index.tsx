// app/components/Sidebar.tsx
"use client";

import { useState } from "react";
import {
  Home, Grid3X3, FileText, BarChart3, Edit3,
  Package, Users, Settings, ShoppingCart, Zap, Key, Webhook, Plug,
  LogIn, UserPlus, Lock, AlertCircle, Server, Wrench, TrendingUp,
  PieChart, AreaChart, Table, MousePointer, CreditCard, Square, FileInput,
  Move, Map, Calendar, Menu, ChevronLeft, MessageCircle
} from "lucide-react";

import { mainApps, themeConfig } from "@/utils/item";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  theme: string;
  activeApp: string;
  setActiveApp: (app: string) => void;
  activeMenuItem: string;
  setActiveMenuItem: (item: string) => void;
}

export default function Sidebar({
  theme,
  activeApp,
  setActiveApp,
  activeMenuItem,
  setActiveMenuItem,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getMenuGroups = () => {
    switch (activeApp) {
      case "Home": return [
        { title: "OVERVIEW", items: [{ label: "Dashboard", icon: BarChart3 }, { label: "Analytics", icon: Zap }, { label: "Reports", icon: FileText }] },
        { title: "QUICK ACTIONS", items: [{ label: "New Project", icon: Package }, { label: "Invite Team", icon: Users }, { label: "Settings", icon: Settings }] }
      ];
      case "Applications": return [
        { title: "APPS", items: [{ label: "CRM", icon: Users }, { label: "E-Commerce", icon: ShoppingCart }, { label: "Project Manager", icon: Package }, { label: "Chat App", icon: MessageCircle }] },
        { title: "INTEGRATIONS", items: [{ label: "API Keys", icon: Key }, { label: "Webhooks", icon: Webhook }, { label: "Plugins", icon: Plug }] }
      ];
      case "Pages": return [
        { title: "AUTHENTICATION", items: [{ label: "Login", icon: LogIn }, { label: "Register", icon: UserPlus }, { label: "Forgot Password", icon: Lock }] },
        { title: "ERROR PAGES", items: [{ label: "404 Not Found", icon: AlertCircle }, { label: "500 Error", icon: Server }, { label: "Maintenance", icon: Wrench }] }
      ];
      case "Tables Charts": return [
        { title: "CHARTS", items: [{ label: "Line Chart", icon: TrendingUp }, { label: "Bar Chart", icon: BarChart3 }, { label: "Pie Chart", icon: PieChart }, { label: "Area Chart", icon: AreaChart }] },
        { title: "TABLES", items: [{ label: "Basic Table", icon: Table }, { label: "Data Grid", icon: Grid3X3 }, { label: "Editable Table", icon: Edit3 }] }
      ];
      case "UI Collection": return [
        { title: "COMPONENTS", items: [{ label: "Buttons", icon: MousePointer }, { label: "Cards", icon: CreditCard }, { label: "Modals", icon: Square }, { label: "Forms", icon: FileInput }] },
        { title: "ADVANCED UI", items: [{ label: "Drag & Drop", icon: Move }, { label: "Charts", icon: BarChart3 }, { label: "Maps", icon: Map }, { label: "Calendar", icon: Calendar }] }
      ];
      default: return [
        { title: "GENERAL", items: [{ label: "Dashboard", icon: Home }, { label: "Profile", icon: Users }, { label: "Settings", icon: Settings }] }
      ];
    }
  };

  const menuGroups = getMenuGroups();
  const t = themeConfig[theme as keyof typeof themeConfig] || themeConfig.blue;

  return (
    <div
      className={`
        h-screen border-r flex flex-col transition-all duration-300 ease-in-out
        ${t.sidebarBg} ${isCollapsed ? "w-20" : "w-[420px]"}
      `}
    >
      {/* Header */}
      <div className={`h-16 flex items-center justify-between px-6 border-b ${t.headerBg} ${t.headerBorder}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span
            className={`text-xl font-bold ${t.headerText} transition-opacity duration-200 ${
              isCollapsed ? "opacity-0 w-0" : "opacity-100"
            }`}
          >
            Radha
          </span>
        </div>

        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg ${t.hoverBg} transition-all hover:scale-110`}
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      {/* Main Content - Always same structure */}
      <div className="flex-1 overflow-hidden relative">
        {/* Expanded View */}
        <div
          className={`
            absolute inset-0 grid grid-cols-[140px_1fr] h-full transition-all duration-300 ease-in-out
            ${isCollapsed ? "opacity-0 pointer-events-none -translate-x-8" : "opacity-100 translate-x-0"}
          `}
        >
          {/* Left Panel: Main Apps */}
          <div className={`border-r py-8 px-4 ${t.leftPanelBg} overflow-hidden`}>
            <div className="grid gap-3">
              {mainApps.map((app) => {
                const Icon = app.icon;
                const isActive = activeApp === app.label;

                return (
                  <button
                    key={app.label}
                    onClick={() => {
                      setActiveApp(app.label);
                      if (app.label === "Home") setActiveMenuItem("Dashboard");
                    }}
                    className={`
                      flex flex-col items-center gap-2 p-4 rounded-xl text-xs font-medium transition-all
                      ${isActive
                        ? `${t.activeBg} ${t.activeText} shadow-lg ring-2 ring-${t.activeBorder.split("-")[1]}-300/30`
                        : `${t.textSecondary} ${t.hoverBg} hover:scale-105`
                      }
                    `}
                  >
                    <Icon size={22} />
                    <span className="mt-1">{app.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Menu Items */}
          <nav className={`p-8 overflow-y-auto ${t.rightPanelBg}`}>
            {menuGroups.map((group) => {
              const hasActive = group.items.some((i) => i.label === activeMenuItem);

              return (
                <div key={group.title} className="mb-10">
                  <h3
                    className={`
                      mb-5 text-xs font-bold uppercase tracking-widest transition-colors
                      ${hasActive ? t.groupTitle : t.groupTitleInactive}
                    `}
                  >
                    {group.title}
                  </h3>

                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeMenuItem === item.label;

                      return (
                        <button
                          key={item.label}
                          onClick={() => setActiveMenuItem(item.label)}
                          className={`
                            w-full flex items-center gap-4 px-5 py-3 rounded-xl text-sm
                            relative group overflow-hidden transition-all
                            ${isActive
                              ? `font-medium ${t.activeBg} ${t.activeText} shadow-md`
                              : `hover:${t.hoverBg}`
                            }
                          `}
                        >
                          {/* Active left border */}
                          <div
                            className={`
                              absolute left-0 top-2 bottom-2 w-1 rounded-r-full transition-all
                              ${isActive ? t.activeBorder : "bg-transparent"}
                            `}
                          />

                          {/* Hover background */}
                          <div className={`absolute inset-0 rounded-xl ${t.hoverBg} opacity-0 group-hover:opacity-100 transition-opacity`} />

                          <Icon
                            size={19}
                            className={`relative z-10 transition-colors ${
                              isActive ? t.activeText : t.textSecondary
                            }`}
                          />
                          <span
                            className={`relative z-10 flex-1 text-left transition-colors ${
                              isActive ? t.activeText : t.textPrimary
                            }`}
                          >
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Collapsed View - Icons Only */}
        <div
          className={`
            absolute inset-0 flex flex-col items-center pt-12 space-y-8 transition-all duration-300
            ${isCollapsed ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          {mainApps.map((app) => {
            const Icon = app.icon;
            const isActive = activeApp === app.label;

            return (
              <button
                key={app.label}
                onClick={() => {
                  setActiveApp(app.label);
                  if (app.label === "Home") setActiveMenuItem("Dashboard");
                }}
                className={`
                  p-3 rounded-xl transition-all hover:scale-110
                  ${isActive ? `${t.activeBg} shadow-lg` : t.hoverBg}
                `}
              >
                <Icon size={24} className={isActive ? t.activeText : t.textSecondary} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}