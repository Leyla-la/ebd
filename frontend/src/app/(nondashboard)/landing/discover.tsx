"use client";

import Image from "next/image";
import { BarChart, ShieldCheck, Zap } from "lucide-react";

export const Discover = () => {
  return (
    <div className="py-20" data-aos="fade-up" data-aos-delay="200">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 text-center mb-4">
            Discover the Power of EBD
          </h2>
          <p className="mt-2 text-base text-green-800/80 font-medium">
            Our system provides a comprehensive suite of tools to help you
            understand and optimize your workforce. From real-time video
            analysis to in-depth performance reports, EBD gives you the insights
            you need to drive your business forward.
          </p>
          <ul className="mt-6 space-y-4">
            <li className="flex items-center">
              <ShieldCheck className="h-6 w-6 text-primary mr-4" />
              <span>Automated and Unbiased Monitoring</span>
            </li>
            <li className="flex items-center">
              <BarChart className="h-6 w-6 text-primary mr-4" />
              <span>Data-Driven Performance Insights</span>
            </li>
            <li className="flex items-center">
              <Zap className="h-6 w-6 text-primary mr-4" />
              <span>Proactive Policy Enforcement</span>
            </li>
          </ul>
        </div>
        <div>
          <Image
            src="/dashboard-screenshot.png"
            alt="EBD Dashboard"
            width={1200}
            height={700}
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};
