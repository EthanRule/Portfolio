"use client";
import { useEffect } from "react";

function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  } else if (hour >= 17 && hour < 20) {
    return "Good Evening";
  } else {
    return "Good Evening";
  }
}

export default function DynamicTitle() {
  useEffect(() => {
    const greeting = getTimeBasedGreeting();
    const finalTitle = "Ethan Rule - Portfolio";

    // Start with greeting
    document.title = greeting;

    // After 3 seconds, transition to final title
    const transitionTimeout = setTimeout(() => {
      document.title = finalTitle;
    }, 5000);

    return () => clearTimeout(transitionTimeout);
  }, []);

  return null;
}
