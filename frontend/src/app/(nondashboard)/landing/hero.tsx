import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-32 bg-gradient-to-br from-green-100 via-green-50 to-green-200 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg className="absolute left-1/2 top-0 -translate-x-1/2" width="1200" height="400" fill="none" viewBox="0 0 1200 400">
          <ellipse cx="600" cy="200" rx="600" ry="200" fill="url(#greenGradient)" fillOpacity="0.3" />
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#b9fbc0" />
              <stop offset="1" stopColor="#d9f99d" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center gap-6 fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-green-900 drop-shadow-lg">
          Employee Behavior Detection
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-2xl text-green-800/80 font-medium">
          Automate employee behavior analysis and boost productivity with AI-powered insights and real-time monitoring.
        </p>
        <Link href="/auth/register">
          <Button size="lg" className="mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-green-400 via-green-300 to-green-200 text-green-900 font-bold text-lg shadow-xl hover:scale-105 transition-transform duration-300">
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
};
