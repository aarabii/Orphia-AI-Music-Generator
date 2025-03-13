import { defaultNavItems } from "@/constants/header-values";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { toast } from "sonner";

export const LandingPageNav = ({
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
    <nav className="hidden gap-6 md:flex">
      {defaultNavItems.map((items) => (
        <Link
          key={items.href}
          href={isAuthenticated ? items.href : "#"}
          onClick={handleClick}
          className={
            "flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground " +
            (items.href === pathnameValue ? "text-foreground" : "")
          }
        >
          {items.label}
        </Link>
      ))}
    </nav>
  );
};
