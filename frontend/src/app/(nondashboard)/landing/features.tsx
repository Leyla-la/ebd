"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  return (
  <div className="relative py-24 overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] h-64 rounded-full blur-3xl z-0" />
      <div className="container mx-auto relative z-10">
  <h2 className="text-center text-3xl md:text-4xl font-bold text-green-900 mb-4">A Comprehensive Feature Set</h2>
  <p className="mt-2 text-center text-base text-green-800/80 font-medium">Everything you need to automate monitoring and boost productivity.</p>
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              data-aos="fade-up"
              data-aos-delay={100 + i * 80}
              className="group bg-white/80 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border border-green-100 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer"
            >
              <div className="mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-200 via-green-100 to-green-50 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <span className="motion-safe:animate-bounce group-hover:motion-safe:animate-spin text-green-600 text-4xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-2">{feature.title}</h3>
              <p className="text-green-800/80 text-base font-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
