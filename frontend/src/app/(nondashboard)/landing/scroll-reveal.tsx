import { useEffect, useRef } from "react";

export function useScrollReveal(className = "reveal") {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        node.classList.add(className);
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [className]);
  return ref;
}

// CSS: .reveal { opacity: 1; transform: none; transition: all 0.8s cubic-bezier(.4,0,.2,1); }
// .not-revealed { opacity: 0; transform: translateY(40px); }
