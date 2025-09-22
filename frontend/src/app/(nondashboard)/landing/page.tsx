import { Features } from "./features";
import { Discover } from "./discover";
import { HowItWorks } from "./how-it-works";
import { FAQ } from "./faq";
import { Footer } from "react-day-picker";
import { CTA } from "./cta";
import { Hero } from "./hero";


const LandingPage = () => {
  return (
    <div className="bg-background text-foreground">
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
