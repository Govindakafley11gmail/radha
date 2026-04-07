// app/components/Sidebar.tsx
"use client";

import { useState } from "react";
import {
  Grid3X3,
  FileText,
  Package,
  Settings,
  ShoppingCart,
  Menu,
  ChevronLeft,
  Magnet,
  ChevronDown,
  ChevronRight,
  Receipt,
  Calculator,
  Workflow,
  DollarSign,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import App from "next/app";

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
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Dashboard",
    "Sales",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  // Define sidebar structure similar to the image
  const sidebarStructure = [
    {
      id: "Dashboard",
      label: "Dashboard",
      icon: Grid3X3,
      hasSubmenu: false,
      onClick: () => {
        setActiveApp("Home");
        setActiveMenuItem("Dashboard");
      },
    },
    {
      id: "User Management",
      label: "Access Management",
      icon: User,
      hasSubmenu: true,
      subItems: [
        {
          label: "User",
          onClick: () => {
            setActiveApp("Access Management");
            setActiveMenuItem("User");
          },
        },
        {
          label: "Roles",
          onClick: () => {
            setActiveApp("Access Management");
            setActiveMenuItem("Role");
          },
        },
        {
          label: "Permission",
          onClick: () => {
            setActiveApp("Access Management");
            setActiveMenuItem("Permission");
          },
        },
      ],
    },
    {
      id: "Sales",
      label: "Sales",
      icon: ShoppingCart,
      hasSubmenu: true,
      subItems: [
        {
          label: "Customer",
          onClick: () => {
            setActiveApp("Sales");
            setActiveMenuItem("Customer");
          },
        },
        {
          label: "Sales Invoices",
          onClick: () => {
            setActiveApp("Sales");
            setActiveMenuItem("Sales Invoices");
          },
        },
        {
          label: "Sales Receipt",
          onClick: () => {
            setActiveApp("Sales");
            setActiveMenuItem("Sales Receipt");
          },
        },
          {
          label: "Discount Scheme",
          onClick: () => {
            setActiveApp("Sales");
            setActiveMenuItem("Discount Scheme");
          },
        },
      ],
    },
    {
      id: "Account Costing",
      label: "Account Costing",
      icon: Receipt,
      hasSubmenu: true,
      subItems: [
        {
          label: "Expenses",
          onClick: () => {
            setActiveApp("Account Costing");
            setActiveMenuItem("Expenses");
          },
        },
        {
          label: "Categories",
          onClick: () => {
            setActiveApp("Account Costing");
            setActiveMenuItem("Raw Materials");
          },
        },
      ],
    },
    {
      id: "Accounting",
      label: "Accounting",
      icon: Calculator,
      hasSubmenu: true,
      subItems: [
        {
          label: "Account Group",
          onClick: () => {
            setActiveApp("Applications");
            setActiveMenuItem("Account-Group");
          },
        },
        {
          label: "Account Type",
          onClick: () => {
            setActiveApp("Applications");
            setActiveMenuItem("Account-Type");
          },
        },
      ],
    },
    {
      id: "Accounts Payable",
      label: "Accounts Payable",
      icon: FileText,
      hasSubmenu: true,
      subItems: [
        // {
        //   label: "Supplier",
        //   onClick: () => {
        //     setActiveApp("Accounts Payable");
        //     setActiveMenuItem("Supplier");
        //   },
        // },
        {
          label: "Purchase Invoice",
          onClick: () => {
            setActiveApp("Accounts Payable");
            setActiveMenuItem("Purchase Invoice");
          },
        },
        {
          label: "Raw Materials Receipt",
          onClick: () => {
            setActiveApp("Accounts Payable");
            setActiveMenuItem("Raw Materials Receipt");
          },
        },
      ],
    },
    {
      id: "Payments",
      label: "Payments",
      icon: DollarSign,
      hasSubmenu: true,
      subItems: [
        {
          label: "Purchase Invoice Payment",
          onClick: () => {
            setActiveApp("Payments");
            setActiveMenuItem("Purchase Invoice Payment");
          },
        },
      ],
    },
    {
      id: "Production Batch",
      label: "Production Batch",
      icon: Package,
      hasSubmenu: true,
      subItems: [
        {
          label: "Production Batch",
          onClick: () => {
            setActiveApp("Production Batch");
            setActiveMenuItem("Production Batch");
          },
        },
        {
          label: "Machines",
          onClick: () => {
            setActiveApp("Production Batch");
            setActiveMenuItem("Machines");
          },
        },

        {
          label: "Labour",
          onClick: () => {
            setActiveApp("Production Batch");
            setActiveMenuItem("Labour");
          },
        },
        {
          label: "Product Unit Cost",
          onClick: () => {
            setActiveApp("Production Batch");
            setActiveMenuItem("Product Unit Cost"); // ✅ FIXED
          },
        },
         {
          label: "Other Production Cost",
          onClick: () => {
            setActiveApp("Production Batch");
            setActiveMenuItem("Other Production Cost"); // ✅ FIXED
          },
        },
      ],
    },
    {
      id: "Automation",
      label: "Automation",
      icon: Workflow,
      hasSubmenu: true,
      subItems: [
        {
          label: "Workflows",
          onClick: () => {
            setActiveApp("Applications");
            setActiveMenuItem("Workflows");
          },
        },
      ],
    },
    {
      id: "Inventory Management",
      label: "Inventory Management",
      icon: Magnet,
      hasSubmenu: true,
      subItems: [
        {
          label: "Raw Material Inventory",
          onClick: () => {
            setActiveApp("Inventory Management");
            setActiveMenuItem("Raw Material Inventory");
          },
        },
            {
          label: "WIP Inventory Component",
          onClick: () => {
            setActiveApp("Inventory Management");
            setActiveMenuItem("WIP Inventory Component");
          },
        },
      ],
    },
    {
      id: "ERP",
      label: "ERP",
      icon: Settings,
      hasSubmenu: true,
      subItems: [
        {
          label: "Leave Types",
          onClick: () => {
            setActiveApp("ERP");
            setActiveMenuItem("Leave Types");
          },
        },
        {
          label: "Leave Application",
          onClick: () => {
            setActiveApp("ERP");
            setActiveMenuItem("Leave Application");
          },
        },
        {
          label: "Payroll",
          onClick: () => {
            setActiveApp("ERP");
            setActiveMenuItem("Payroll");
          },
        },
      ],
    },
    {
      id: "Approval",
      label: "Approval",
      icon: Workflow,
      hasSubmenu: true,
      subItems: [
        {
          label: "Purchase Approval",
          onClick: () => {
            setActiveApp("Approval");
            setActiveMenuItem("Purchase Approval");
          },
        },
      ],
    },
  ];

  return (
    <div
      className={`
        h-screen  flex flex-col transition-all duration-300 ease-in-out bg-background
        ${isCollapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-foreground"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="currentColor"
                opacity="0.2"
              />
              <circle cx="12" cy="12" r="6" fill="currentColor" />
            </svg>
          </div>
          {!isCollapsed && (
            <span className="text-lg font-semibold text-foreground">
              LogoIpsum
            </span>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {sidebarStructure.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSections.includes(section.id);
          // const isSectionActive = section.subItems?.some(
          //   (item) => item.label === activeMenuItem,
          // );
          const isDirectActive =
            !section.hasSubmenu && activeMenuItem === section.label;

          return (
            <div key={section.id} className="mb-1">
              {/* Main Section Button */}
              <button
                onClick={() => {
                  if (section.hasSubmenu) {
                    toggleSection(section.id);
                  } else {
                    section.onClick?.();
                  }
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 text-sm
                  transition-colors relative group
                  ${
                    isDirectActive
                      ? "bg-[#e8d5c4] text-[#6b5344] font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{section.label}</span>
                    {section.hasSubmenu && (
                      <span className="ml-auto">
                        {isExpanded ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </span>
                    )}
                  </>
                )}
              </button>

              {/* Submenu Items */}
              {section.hasSubmenu && isExpanded && !isCollapsed && (
                <div className="pl-11 py-1">
                  {section.subItems?.map((item) => {
                    const isActive = activeMenuItem === item.label;

                    return (
                      <button
                        key={item.label}
                        onClick={item.onClick}
                        className={`
                          w-full text-left px-4 py-2 text-sm rounded-md
                          transition-colors
                          ${
                            isActive
                              ? "bg-[#e8d5c4] text-[#6b5344] font-medium"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          }
                        `}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
