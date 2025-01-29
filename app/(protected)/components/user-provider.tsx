"use client";

import { useUserStore } from "@/lib/store/user-store";
import { useGetUser } from "@/services/api/protected/useGetUser";
import { useEffect, useState } from "react";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const { user, setUser, setUserDetails } = useUserStore();

  const { data: userData } = useGetUser({ supabaseId: user!.id });

  // Handle hydration
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (userData) {
      setUserDetails(userData.user_id!, userData.user_role!);
    }
  }, [userData, setUser, setUserDetails]);

  // Show nothing until hydration is complete
  if (!hydrated) {
    return null;
  }

  return <>{children}</>;
}
