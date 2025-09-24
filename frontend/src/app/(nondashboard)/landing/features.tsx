"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  BarChart,
  Bot,
  Computer,
  Lock,
  ShieldCheck,
  User,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: <Computer className="h-12 w-12 text-primary" />,
    title: "Real-time Monitoring",
    description:
      "Securely monitor employee activities in real-time through encrypted live video streams from office cameras.",
  },
  {
    icon: <User className="h-12 w-12 text-primary" />,
    title: "AI Behavior Analysis",
    description:
      "Utilize advanced AI models like YOLOv8 and DeepSORT to automatically classify behaviors such as working, talking, or using a phone.",
  },
  {
    icon: <BarChart className="h-12 w-12 text-primary" />,
    title: "Performance Reports",
    description:
      "Generate detailed, objective performance reports and analytics to track productivity trends and integrate with your payroll system.",
  },
  {
    icon: <Zap className="h-12 w-12 text-primary" />,
    title: "Instant Alerts",
    description:
      "Receive real-time alerts for policy violations, enabling immediate and appropriate managerial responses.",
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-primary" />,
    title: "Privacy First",
    description:
      "Built with GDPR/PDPA compliance in mind, featuring data encryption, anonymization, and role-based access control.",
  },
  {
    icon: <Lock className="h-12 w-12 text-primary" />,
    title: "Advanced Security",
    description:
      "End-to-end data protection using AES-256 encryption for all stored information and secure JWT for authentication.",
  },
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    title: "Gamification & Engagement",
    description:
      "Boost morale and productivity with optional gamification features that reward high-performing employees.",
  },
  {
    icon: <Bot className="h-12 w-12 text-primary" />,
    title: "AI Chatbot Assistant",
    description:
      "An intelligent chatbot for managers to quickly query employee data, performance metrics, and system status.",
  },
];

export const Features = () => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  return (
    <div className="relative py-24 overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] h-64 rounded-full blur-3xl z-0" />
      <div className="container mx-auto relative z-10">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-green-900 mb-4">A Comprehensive Feature Set</h2>
        <p className="mt-2 text-center text-base text-green-800/80 font-medium">Everything you need to automate monitoring and boost productivity.</p>
        <div className="mt-16 relative" style={{zIndex: 100}}>
          {/* Fade left */}
          <div
            className={`pointer-events-none absolute left-0 top-0 h-full w-40 z-[10] transition-opacity duration-200 ${activeIndex > 0 ? 'opacity-100' : 'opacity-0'}`}
            style={{
              background:
                'radial-gradient(circle at left, rgba(16,185,129,0.85) 60%, rgba(34,197,94,0.5) 80%, rgba(16,185,129,0.15) 95%, rgba(16,185,129,0) 100%)',
              boxShadow: '0 0 32px 8px rgba(16,185,129,0.12)'
            }}
          />
          {/* Fade right */}
          <div
            className={`pointer-events-none absolute right-0 top-0 h-full w-40 z-[10] transition-opacity duration-200 ${activeIndex < maxIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{
              background:
                'radial-gradient(circle at right, rgba(16,185,129,0.85) 60%, rgba(34,197,94,0.5) 80%, rgba(16,185,129,0.15) 95%, rgba(16,185,129,0) 100%)',
              boxShadow: '0 0 32px 8px rgba(16,185,129,0.12)'
            }}
          />
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.custom-swiper-prev',
              nextEl: '.custom-swiper-next',
              disabledClass: 'hidden',
            }}
            onSwiper={swiper => {
              swiperRef.current = swiper;
              let slidesPerView = swiper.params.slidesPerView;
              if (typeof slidesPerView !== 'number') slidesPerView = 1;
              setMaxIndex(swiper.slides.length - slidesPerView);
            }}
            onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="z-[2000]"
            style={{zIndex: 2000, position: 'relative'}}
          >
            {features.map((feature, i) => (
              <SwiperSlide key={feature.title}>
                <div
                  data-aos="fade-up"
                  data-aos-delay={100 + i * 80}
                  className="group bg-white/80 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border border-green-100 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer min-h-[340px] h-full"
                >
                  <div className="mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-200 via-green-100 to-green-50 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <span className="motion-safe:animate-bounce group-hover:motion-safe:animate-spin text-green-600 text-4xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">{feature.title}</h3>
                  <p className="text-green-800/80 text-base font-medium">{feature.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom navigation buttons */}
          <button
            className={`custom-swiper-prev absolute left-2 top-1/2 -translate-y-1/2 p-0 bg-transparent border-none shadow-none text-green-700 hover:text-green-900 focus:outline-none z-[9999] transition-opacity duration-200 ${activeIndex > 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            aria-label="Previous"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button
            className={`custom-swiper-next absolute right-2 top-1/2 -translate-y-1/2 p-0 bg-transparent border-none shadow-none text-green-700 hover:text-green-900 focus:outline-none z-[9999] transition-opacity duration-200 ${activeIndex < maxIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            aria-label="Next"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
          <style jsx global>{`
            .swiper {
              z-index: 2000 !important;
              position: relative;
            }
            .swiper-button-next, .swiper-button-prev {
              display: none !important;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
// ...existing code...
}
