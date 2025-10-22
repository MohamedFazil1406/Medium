import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export interface UserPayload {
  id: string;
  username: string;
}

export function useCurrentUser() {
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<UserPayload>(token);
        console.log(decoded.username);
        setUser(decoded);
      } catch (error) {
        console.error("Failed to decode JWT:", error);
        setUser(null);
      }
    }
  }, []);

  return user;
}
