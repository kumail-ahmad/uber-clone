"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function ClientUser() {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      console.log("Successfully logged in");
    }
  }, [user]);

  return null;
}
