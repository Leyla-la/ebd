"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

export const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-32 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center gap-6 fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-green-900 drop-shadow-lg">
          Employee Behavior Detection
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-2xl text-green-800/80 font-medium min-h-[3.5rem]">
          <Typewriter
            words={["Automate employee behavior analysis and boost productivity with AI-powered insights and real-time monitoring.",
              "Real-time monitoring for your workplace.",
              "AI-powered insights for better management.",
              "Boost productivity with smart analytics."]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={40}
            deleteSpeed={30}
            delaySpeed={1800}
          />
        </p>
        <Link href="/auth/login">
          <Button
            size="lg"
            className="mt-4 px-12 py-6 rounded-full bg-gradient-to-r from-green-400 via-green-300 to-green-200 text-green-900 font-bold text-2xl shadow-xl transition-colors duration-500 hover:bg-gradient-to-r hover:from-green-200 hover:via-green-400 hover:to-green-500"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};
