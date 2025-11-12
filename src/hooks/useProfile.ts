/** @format */

import { useEffect, useState } from "react";
import { UserType } from "../types";
import { isStringValid } from "../utils";

export function useProfile() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userState = localStorage.getItem("profile");
  const profile: UserType = isStringValid(userState)
    ? JSON.parse(userState as string)
    : null;

  const logout = () => {
    localStorage.removeItem("profile");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(!!profile?.email && !!profile?.username);
  }, [profile]);

  return {
    isAuthenticated,
    email: profile?.email ?? null,
    userName: profile?.username,
    logout,
  };
}
