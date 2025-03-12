"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Music2,
  Upload,
  Users,
  BrainCircuit,
  HeartHandshake,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Shield,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SideNav() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 1024) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }

      return isMobile;
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Update the navItems array to remove the FAQ, Privacy Policy, and Terms of Service items
  const navItems = [
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

  // Create a new array for the bottom navigation items
  const bottomNavItems = [
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

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={cn(
        "hidden md:flex flex-col border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed h-screen z-30",
        isExpanded ? "sidebar-expanded" : "sidebar-collapsed"
      )}
    >
      <div className="flex h-16 items-center px-4 border-b justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
            <Music2 className="h-5 w-5 text-primary" />
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse"></div>
          </div>
          <span
            className={cn(
              "font-bold text-lg gradient-text sidebar-item-text",
              !isExpanded && "hidden"
            )}
          >
            Orphia
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full h-8 w-8 ml-auto"
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex flex-col h-[calc(100vh-4rem)] justify-between">
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-2 px-2">
            <TooltipProvider delayDuration={0}>
              {navItems.map((item, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                        item.href === pathname &&
                          "bg-primary/10 text-secondary font-medium border-2 border-accent hover:text-secondary/80"
                      )}
                    >
                      {item.icon}
                      <span
                        className={cn(
                          "sidebar-item-text",
                          !isExpanded && "hidden"
                        )}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className={isExpanded ? "hidden" : undefined}
                  >
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </nav>
        </ScrollArea>

        <div className="mt-auto">
          <div className="px-2 py-2">
            <nav className="grid gap-2">
              <TooltipProvider delayDuration={0}>
                {bottomNavItems.map((item, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                          item.href === pathname &&
                            "bg-primary/10 text-primary font-medium"
                        )}
                      >
                        {item.icon}
                        <span
                          className={cn(
                            "sidebar-item-text",
                            !isExpanded && "hidden"
                          )}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className={isExpanded ? "hidden" : undefined}
                    >
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </nav>
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className={cn("sidebar-item-text", !isExpanded && "hidden")}>
                <p className="text-sm font-medium">Guest User</p>
                <p className="text-xs text-muted-foreground">
                  guest@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
