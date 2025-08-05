"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, isAdmin, getCurrentUserFromStorage } from "./api";

export const useAuth = (requireAdmin = true) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      const adminUser = isAdmin();
      const currentUser = getCurrentUserFromStorage();

      setUser(currentUser);

      if (!authenticated) {
        setIsAuthorized(false);
        setIsLoading(false);
        router.push("/admin/login");
        return;
      }

      if (requireAdmin && !adminUser) {
        setIsAuthorized(false);
        setIsLoading(false);
        router.push("/unauthorized");
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [requireAdmin, router]);

  return {
    isLoading,
    isAuthorized,
    user,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
  };
};

export const useAdminAuth = (redirectTo = null) => {
  return useAuth(true, redirectTo);
};

export const useUserAuth = (redirectTo = null) => {
  return useAuth(false, redirectTo);
};
