import {
  Home,
  Upload,
  Users,
  BrainCircuit,
  HeartHandshake,
  Sparkles,
  HelpCircle,
  Shield,
  FileText,
} from "lucide-react";

export const navItems = [
  {
    title: "Home",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Create with Prompt",
    href: "/create/prompt",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Upload Sample",
    href: "/create/sample",
    icon: <Upload className="h-5 w-5" />,
  },
  {
    title: "Our Team",
    href: "/team",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Our Model",
    href: "/model",
    icon: <BrainCircuit className="h-5 w-5" />,
  },
  {
    title: "Contribute",
    href: "/contribute",
    icon: <HeartHandshake className="h-5 w-5" />,
  },
];

export const bottomNavItems = [
  {
    title: "FAQ",
    href: "/faq",
    icon: <HelpCircle className="h-5 w-5" />,
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    title: "Terms of Service",
    href: "/terms-of-service",
    icon: <FileText className="h-5 w-5" />,
  },
];
