"use client";

import { createContext, useContext } from "react";
import type { CurrentUser } from "@/lib/types";

interface UserContextType {
  currentUser: CurrentUser | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
currentUser,
}: {
  children: React.ReactNode;
  currentUser: CurrentUser | null;
}) {
  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context.currentUser;
}

