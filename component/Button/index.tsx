"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ActionButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "verified" | "rejected" | "default";
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
};

const VARIANT_STYLES = {
  verified:
    "bg-green-600 hover:bg-green-700 text-white shadow-green-300",
  rejected:
    "bg-red-600 hover:bg-red-700 text-white shadow-red-300",
  default:
    "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-300",
};

export const ActionButton = ({
  label,
  onClick,
  type = "button",
  variant = "default",
  icon,
  disabled = false,
  className,
}: ActionButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "flex items-center gap-2 px-6 py-2 rounded-xl shadow-md transition-all",
          VARIANT_STYLES[variant],
          className
        )}
      >
        {icon}
        {label}
      </Button>
    </motion.div>
  );
};
