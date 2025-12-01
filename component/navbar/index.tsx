"use client";

import { Bell, Globe, HelpCircle, Search, LogIn, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const themes = ["light", "dark", "orange", "blue", "green"] as const;
type ThemeType = (typeof themes)[number];

const themeIcons: Record<ThemeType, React.ReactNode> = {
  light: <Sun className="w-4 h-4" />,
  dark: <Moon className="w-4 h-4" />,
  orange: <div className="w-4 h-4 rounded-full bg-orange-500" />,
  blue: <div className="w-4 h-4 rounded-full bg-blue-500" />,
  green: <div className="w-4 h-4 rounded-full bg-green-500" />,
};

const themeLabels = {
  light: "Light",
  dark: "Dark",
  orange: "Orange",
  blue: "Blue",
  green: "Green",
};

export default function TopNavbar({
  theme,
  setTheme,
}: {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}) {
  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Utility Icons */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search UI..."
            className="pl-10 pr-4 h-10 w-72 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>

        {/* Theme Selector - Beautiful Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button  size="sm" className="gap-2">
              {themeIcons[theme]}
              <span className="capitalize">{themeLabels[theme]}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {themes.map((t) => (
              <DropdownMenuItem
                key={t}
                onClick={() => setTheme(t)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {themeIcons[t]}
                  <span className="capitalize font-medium">{themeLabels[t]}</span>
                </div>
                {theme === t && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Active
                  </Badge>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Login Button */}
        <Button className="gap-2 font-medium">
          <LogIn className="h-4 w-4" />
          Log In
        </Button>
      </div>
    </header>
  );
}