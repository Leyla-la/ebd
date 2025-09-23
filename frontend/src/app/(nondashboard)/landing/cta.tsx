"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CTA = () => {
  return (
    <div
      className="w-full py-16 flex flex-col items-center justify-center"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="max-w-2xl w-full flex flex-col items-center text-center gap-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-green-900 mb-4">
          Ready to transform your workplace?
        </h2>
        <p className="mt-2 text-center text-base text-green-800/80 font-medium">
          Sign in now to unlock the full potential of employee behavior
          detection and productivity insights.
        </p>
        <Link href="/auth/login" className="w-full flex justify-center">
          <Button
            size="lg"
            className="px-10 py-5 rounded-full bg-gradient-to-r from-green-400 via-green-300 to-green-200 text-green-900 font-bold text-xl shadow-lg transition-colors duration-500 hover:bg-gradient-to-r hover:from-green-200 hover:via-green-400 hover:to-green-500"
          >
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
};
