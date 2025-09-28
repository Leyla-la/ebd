"use client";

import { Features } from "./features";
import { Discover } from "./discover";
import { HowItWorks } from "./how-it-works";
import { FAQ } from "./faq";
import { CTA } from "./cta";
import { Hero } from "./hero";
import { Footer } from "./footer";
import { Navbar } from "@/components/navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-100 via-green-50 to-green-200 text-foreground" style={{ paddingTop: '60px' }}>
      <Navbar />
      <main>
        <section data-aos="fade-up" data-aos-delay="0">
          <Hero />
        </section>
        <section data-aos="fade-up" data-aos-delay="100">
          <Features />
        </section>
        <section data-aos="fade-up" data-aos-delay="200">
          <Discover />
        </section>
        <section data-aos="fade-up" data-aos-delay="300">
          <HowItWorks />
        </section>
        <section data-aos="fade-up" data-aos-delay="400">
          <FAQ />
        </section>
        <section data-aos="zoom-in" data-aos-delay="500">
          <CTA />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
