import { navItems } from "@/constants/header-values";
import { cn } from "@/lib/utils";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { toast } from "sonner";

export const LandingPageSideNavTop = ({
  pathnameValue,
}: {
  pathnameValue: string;
}) => {
  const { isAuthenticated } = useConvexAuth();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast("You must be logged in to access this page!");
    }
  };

  return (
    <div className="grid gap-2 py-6 pr-6">
      {navItems.map((item) => (
        <Link
          key={isAuthenticated ? item.href : "#"}
          onClick={handleClick}
          href={item.href}
          className={cn(
            "flex w-full items-center gap-2 rounded-lg py-2 text-lg font-medium",
            item.href === pathnameValue
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </div>
  );
};
