"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { UserAvatar } from "../user-avatar";
import { BottomNav } from "./ButtomNav";
import { TopNav } from "./TopNav";

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
          <TopNav isExpandedValue={isExpanded} pathnameValue={pathname} />
        </ScrollArea>

        <div className="mt-auto">
          <div className="px-2 py-2">
            <BottomNav isExpandedValue={isExpanded} pathnameValue={pathname} />
          </div>
          <div className="p-4 border-t">
            <UserAvatar isExpandedValue={isExpanded} />
          </div>
        </div>
      </div>
    </div>
  );
}
