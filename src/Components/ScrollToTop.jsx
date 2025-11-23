// src/Components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function smoothScrollToTop() {
  const start = window.scrollY;
  const duration = 600; // animation duration in ms
  const startTime = performance.now();

  function step(timestamp) {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    smoothScrollToTop();
  }, [pathname]);

  return null;
}
