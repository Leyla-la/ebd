"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "How does the EBD system ensure employee privacy?",
    answer:
      "The EBD system is designed with a 'privacy-first' approach, adhering to GDPR and PDPA standards. All data is encrypted, and we use anonymization techniques to protect employee identities. Access to data is strictly controlled through role-based permissions.",
  },
  {
    question: "What kind of cameras are compatible with the system?",
    answer:
      "Our system is highly flexible and can ingest video streams from a wide variety of sources, including standard RTSP security cameras, uploaded MP4 files, and even webcams, making it easy to integrate with your existing hardware.",
  },
  {
    question:
      "Can the system distinguish between work-related conversations and casual chat?",
    answer:
      "Yes. While we do not analyze audio, our advanced AI models analyze body language, posture, and social context to differentiate between formal, work-related interactions and informal, non-work conversations with a high degree of accuracy.",
  },
  {
    question: "How are the AI models deployed and updated?",
    answer:
      "We follow a professional MLOps workflow. Models are trained in a dedicated environment like Google Colab, then optimized and containerized using Docker. This ensures consistent performance and allows for seamless updates without system downtime.",
  },
];

export const FAQ = () => {
  return (
    <div className="relative py-24 overflow-hidden">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-left text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="mt-12 space-y-4">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={item.question}
              value={item.question}
              className="border-0 rounded-2xl bg-white/90 shadow-lg animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <AccordionTrigger className="flex items-center justify-between px-6 py-4 text-lg font-semibold text-green-900 hover:bg-green-50 rounded-2xl transition-all text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-green-800/80 text-base border-l-4 border-green-200 bg-gradient-to-r from-green-50 via-white to-green-100 rounded-b-2xl text-left">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </div>
  );
};
