"use client";

import { useEffect } from "react";

export const NotificationHandler = () => {
  useEffect(() => {
    // Marquer les notifications comme lues au chargement du Dashboard
    const clearNotifs = async () => {
      try {
        await fetch("/api/notifications/read", { method: "POST" });
      } catch (error) {
        console.error("Failed to clear notifications:", error);
      }
    };
    
    clearNotifs();
  }, []);

  return null;
};
