"use client";
import { useEffect } from "react";

function getTimeBasedEmoji(): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "😊"; // Good Morning
  } else if (hour >= 12 && hour < 17) {
    return "😌"; // Good Afternoon
  } else if (hour >= 17 && hour < 20) {
    return "🌅"; // Good Evening
  } else {
    return "😴"; // Good Evening (late)
  }
}

function createEmojiIcon(emoji: string): string {
  return `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2285%22>${emoji}</text></svg>`;
}

function createLightningIcon(): string {
  return `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><path d=%22M25 5 L75 45 L55 45 L75 95 L25 55 L45 55 Z%22 fill=%22%23FFD700%22 stroke=%22%23000%22 stroke-width=%223%22/></svg>`;
}

export default function DynamicFavicon() {
  useEffect(() => {
    const setFavicon = (href: string) => {
      // Remove existing favicon
      const existingFavicon = document.querySelector("link[rel='icon']");
      if (existingFavicon) {
        existingFavicon.remove();
      }

      // Add new favicon
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = href;
      document.head.appendChild(link);
    };

    // Show emoji favicon initially
    const emoji = getTimeBasedEmoji();
    const emojiIconUrl = createEmojiIcon(emoji);
    setFavicon(emojiIconUrl);

    // After 5 seconds, switch back to lightning bolt icon
    const timeout = setTimeout(() => {
      const lightningIcon = createLightningIcon();
      setFavicon(lightningIcon);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
