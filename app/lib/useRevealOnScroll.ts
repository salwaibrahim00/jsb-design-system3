"use client";

import { useEffect } from "react";

export function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => el.classList.add("revealed"));
  }, []);
}