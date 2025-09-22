import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Database, Layers, Presentation, Server } from "lucide-react";

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
    <div className="py-20">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold">How It Works</h2>
        <p className="mt-4 text-center text-muted-foreground">
          Following a robust 4-layer architecture for a seamless flow from data input to insight delivery.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={step.title} className="flex items-center">
              <Card className="zoom-in w-full text-center">
                <CardHeader>
                  {step.icon}
                  <CardTitle className="mt-4">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
              {index < processSteps.length - 1 && (
                <ArrowRight className="hidden lg:block h-10 w-10 text-muted-foreground mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
