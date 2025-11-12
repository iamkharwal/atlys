/** @format */

import { UserType } from "../types";
import { isStringValid } from "../utils";

export function useProfile() {
  const userState = localStorage.getItem("profile");
  const profile: UserType = isStringValid(userState)
    ? JSON.parse(userState as string)
      : null;
    
   const isAuthenticated = !!profile?.email && !!profile?.username

  return {
    isAuthenticated,
    email: profile?.email ?? null,
    userName: profile?.username
  };
}
