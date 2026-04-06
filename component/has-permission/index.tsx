"use client";

import { useAuth } from "@/app/context/AuthContext";

const Can = ({ 
  permission, 
  children 
}: { 
  permission: string; 
  children: React.ReactNode;
}) => {
  const { user, isLoading } = useAuth();

  
  // Don't render while loading
  if (isLoading) {
    return null;
  }

  // No user = no permissions
  if (!user) {
    return null;
  }

  // Check permission
  const hasPermission = user.permission?.some(
    (p) => p.name === permission
  );



  return hasPermission ? <>{children}</> : null;
};

export default Can;