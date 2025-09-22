
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Layers, Presentation, Server } from "lucide-react";

const processSteps = [
  {
    icon: <Layers className="h-10 w-10 text-primary" />,
    title: "1. Ingest Layer",
    description: "The system captures video streams from various sources like RTSP cameras, MP4 files, or webcams, preparing the raw data for analysis.",
  },
  {
    icon: <Server className="h-10 w-10 text-primary" />,
    title: "2. Processing Layer",
    description: "AI models perform real-time analysis. YOLOv8 detects objects, MTCNN & FaceNet identify employees, and DeepSORT tracks movements.",
  },
  {
    icon: <Database className="h-10 w-10 text-primary" />,
    title: "3. Data Store",
    description: "Structured data, including activity logs, performance metrics, and violation alerts, is securely stored in a PostgreSQL database.",
  },
  {
    icon: <Presentation className="h-10 w-10 text-primary" />,
    title: "4. Presentation Layer",
    description: "A user-friendly dashboard built with React displays real-time analytics, video feeds, and reports, accessible to managers.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-green-100 via-white to-green-50 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-green-900 mb-4 animate-fade-in-up">How It Works</h2>
        <p className="mt-2 text-center text-lg text-green-800/80 font-medium animate-fade-in-up delay-100">A robust 4-layer architecture for seamless insight delivery.</p>
        <div className="mt-16 flex flex-col lg:flex-row items-center justify-center gap-8 relative">
          {processSteps.map((step, index) => (
            <div key={step.title} className={`relative flex flex-col items-center w-full max-w-xs animate-fade-in-up`} style={{ animationDelay: `${index * 200}ms` }}>
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-200 via-green-100 to-green-50 flex items-center justify-center shadow-lg mb-4 border-4 border-green-100 animate-pulse-slow">
                <span className="text-green-600 text-4xl">{step.icon}</span>
              </div>
              <Card className="w-full bg-white/90 rounded-2xl shadow-xl border border-green-100 p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="mt-2 text-lg font-bold text-green-900">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-800/80 text-base font-medium">{step.description}</p>
                </CardContent>
              </Card>
              {index < processSteps.length - 1 && (
                <svg className="hidden lg:block absolute right-[-60px] top-1/2 -translate-y-1/2 animate-arrow-move" width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12C20 12 40 12 58 12" stroke="#4ade80" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M50 4L58 12L50 20" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1) both; }
        .delay-100 { animation-delay: 0.1s; }
        .animate-pulse-slow { animation: pulse 2.5s infinite; }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 #bbf7d0; }
          50% { box-shadow: 0 0 32px 8px #bbf7d0; }
        }
        .animate-arrow-move { animation: arrow-move 2.5s infinite alternate; }
        @keyframes arrow-move {
          0% { transform: translateX(0) scale(1); }
          100% { transform: translateX(16px) scale(1.08); }
        }
      `}</style>
    </section>
  );
};
