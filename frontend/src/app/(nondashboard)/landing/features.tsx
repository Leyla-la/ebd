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
    <div className="bg-secondary py-20">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold">
          A Comprehensive Feature Set
        </h2>
        <p className="mt-4 text-center text-muted-foreground">
          Everything you need to automate monitoring and boost productivity.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="zoom-in flex flex-col text-center items-center">
              <CardHeader>
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
