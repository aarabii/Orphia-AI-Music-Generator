"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

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
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { Spinner } from "../spinner";
import { Fragment } from "react";
import { navItems, bottomNavItems } from "@/constants/header-values";
import { LandingPageNav } from "./LandingaPageNav";
import { LandingPageSideNavTop } from "./LandingPageSideNavTop";
import { UserAvatar } from "../user-avatar";

interface SiteHeaderProps {
  showMobileOnly?: boolean;
}

export function SiteHeader({ showMobileOnly = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const { isAuthenticated, isLoading } = useConvexAuth();

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
          {isLandingPage && <LandingPageNav pathnameValue={pathname} />}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {isLandingPage && (
              <div className="flex items-center space-x-1">
                {isLoading && <Spinner />}
                {!isLoading && !isAuthenticated && (
                  <Fragment>
                    <SignInButton mode="modal">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                      >
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignInButton mode="modal">
                      <Button size="sm" className="rounded-full">
                        Create Account
                      </Button>
                    </SignInButton>
                  </Fragment>
                )}
                {isAuthenticated && !isLoading && (
                  <Fragment>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                      asChild
                    >
                      <Link href="/create/prompt">Get Started</Link>
                    </Button>
                    <UserButton afterSignOutUrl="/" />
                  </Fragment>
                )}
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
                    <LandingPageSideNavTop pathnameValue={pathname} />

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
                  <div className="py-4 pr-8 border-t">
                    <UserAvatar />
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
