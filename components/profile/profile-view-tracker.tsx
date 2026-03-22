"use client";

import { useEffect } from "react";

export const ProfileViewTracker = ({ profileId, currentUserId }: { profileId: string; currentUserId?: string }) => {
  useEffect(() => {
    if (currentUserId && profileId !== currentUserId) {
      const trackView = async () => {
        try {
          await fetch("/api/profile/view", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ profileId }),
          });
        } catch (error) {
          console.error("Failed to track profile view:", error);
        }
      };
      
      // Petit délai pour ne pas compter les rebonds rapides
      const timer = setTimeout(trackView, 2000);
      return () => clearTimeout(timer);
    }
  }, [profileId, currentUserId]);

  return null;
};
