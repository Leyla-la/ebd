
import { Features } from "./features";
import { Discover } from "./discover";
import { HowItWorks } from "./how-it-works";
import { FAQ } from "./faq";
import { CTA } from "./cta";
import { Hero } from "./hero";
import { Footer } from "./footer";



const LandingPage = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
  <main>
        <Hero />
        <Features />
        <Discover />
        <HowItWorks />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
