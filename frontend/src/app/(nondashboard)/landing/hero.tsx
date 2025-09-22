import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 bg-black/50" />
      <video
        className="h-full w-full object-cover"
        src="/landing-video.mp4"
        autoPlay
        loop
        muted
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white fade-in">
        <h1 className="text-5xl font-bold md:text-7xl">
          Employee Behavior Detection
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Automate employee behavior analysis and boost productivity.
        </p>
        <Link href="/auth/register">
          <Button size="lg" className="mt-8 zoom-in">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};
