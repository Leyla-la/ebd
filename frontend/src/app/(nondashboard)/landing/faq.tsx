import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div className="py-20">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-center text-4xl font-bold">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="mt-12">
          {faqItems.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
