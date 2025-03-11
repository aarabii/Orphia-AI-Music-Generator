"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Home,
  Sparkles,
  Upload,
  Users,
  BrainCircuit,
  HeartHandshake,
  HelpCircle,
  Shield,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

interface SiteHeaderProps {
  showMobileOnly?: boolean;
}

export function SiteHeader({ showMobileOnly = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    {
      href: "/create/prompt",
      label: "Create with Prompt",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      href: "/create/sample",
      label: "Upload Sample",
      icon: <Upload className="h-5 w-5" />,
    },
    { href: "/team", label: "Our Team", icon: <Users className="h-5 w-5" /> },
    {
      href: "/model",
      label: "Our Model",
      icon: <BrainCircuit className="h-5 w-5" />,
    },
    {
      href: "/contribute",
      label: "Contribute",
      icon: <HeartHandshake className="h-5 w-5" />,
    },
  ];

  const bottomNavItems = [
    { href: "/faq", label: "FAQ", icon: <HelpCircle className="h-5 w-5" /> },
    {
      href: "/privacy-policy",
      label: "Privacy Policy",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      href: "/terms-of-service",
      label: "Terms of Service",
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        showMobileOnly && "md:hidden"
      )}
    >
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
              <Image
                src="/icon.svg"
                alt="icon"
                width={50}
                height={50}
                className="p-2"
              />
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse"></div>
            </div>
            <span className="font-bold text-lg gradient-text">Orphia</span>
          </Link>
          {isLandingPage && (
            <nav className="hidden gap-6 md:flex">
              {[
                { href: "/", label: "Home" },
                { href: "/create/prompt", label: "Create with Prompt" },
                { href: "/create/sample", label: "Upload Sample" },
                { href: "/team", label: "Our Team" },
                { href: "/model", label: "Our Model" },
                { href: "/contribute", label: "Contribute" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    item.href === pathname && "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {isLandingPage && (
              <div className="flex items-center space-x-1">
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" className="rounded-full">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="pr-0 w-[280px] sm:w-[350px]"
              >
                <SheetHeader className="mb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <Image
                      src="/icon.svg"
                      alt="icon"
                      width={50}
                      height={50}
                      className="p-2"
                    />
                    <span className="gradient-text">Orphia</span>
                  </SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-5rem)]">
                  <div className="flex flex-col h-full justify-between">
                    <div className="grid gap-2 py-6 pr-6">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-lg py-2 text-lg font-medium",
                            item.href === pathname
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="grid gap-2 py-6 pr-6 border-t pt-6">
                        {bottomNavItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex w-full items-center gap-2 rounded-lg py-2 text-base font-medium",
                              item.href === pathname
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          >
                            {item.icon}
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  );
}
