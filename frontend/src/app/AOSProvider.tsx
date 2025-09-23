"use client";
import { useEffect } from "react";
import { initAOS } from "@/lib/aos-init";

export default function AOSProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAOS();
  }, []);
  return <>{children}</>;
}
