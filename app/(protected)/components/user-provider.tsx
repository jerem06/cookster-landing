"use client";

import { useUserStore } from "@/lib/store/user-store";
import { useGetUser } from "@/services/api/protected/useGetUser";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  const [hydrated, setHydrated] = useState(false);
  const { setUser, setUserDetails } = useUserStore();

  const { data: userData } = useGetUser({
    supabaseId: user.id,
  });

  // Handle hydration
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (userData && user) {
      setUser(user);
      setUserDetails(userData.user_id!, userData.user_role!);
    }
  }, [userData, user, setUser, setUserDetails]);

  // Show nothing until hydration is complete
  if (!hydrated) {
    return null;
  }

  return <>{children}</>;
}
