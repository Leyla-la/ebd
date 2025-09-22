import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">EBD</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/auth/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
