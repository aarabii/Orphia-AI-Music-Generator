"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { SiteHeader } from "@/components/header";
import { SiteFooter } from "@/components/footer";
import { SideNav } from "@/components/nav";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const isLandingPage = pathname === "/";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (isLandingPage) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex flex-col flex-1 md:ml-[70px] lg:ml-[240px]">
        <SiteHeader showMobileOnly />
        <main className="flex-1 pb-12 overflow-x-hidden">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
