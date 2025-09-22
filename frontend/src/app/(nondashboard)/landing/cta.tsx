import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CTA = () => {
  return (
    <div className="bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
        <p className="mt-4 text-lg">
          Request a demo or create an account to start using EBD today.
        </p>
        <div className="mt-8 space-x-4">
          <Link href="/request-demo">
            <Button size="lg" variant="secondary">
              Request a Demo
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="lg" variant="outline">
              Create an Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
