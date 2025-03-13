import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { navItems } from "@/constants/nav-values";
import { cn } from "@/lib/utils";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { toast } from "sonner";

export const TopNav = ({
  isExpandedValue,
  pathnameValue,
}: {
  isExpandedValue: boolean;
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
    <nav className="grid gap-2 px-2">
      <TooltipProvider delayDuration={0}>
        {navItems.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Link
                href={isAuthenticated ? item.href : "#"}
                onClick={handleClick}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                  item.href === pathnameValue &&
                    "bg-primary/10 text-secondary font-medium border-2 border-accent hover:text-secondary/80"
                )}
              >
                {item.icon}
                <span
                  className={cn(
                    "sidebar-item-text",
                    !isExpandedValue && "hidden"
                  )}
                >
                  {item.title}
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className={isExpandedValue ? "hidden" : undefined}
            >
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </nav>
  );
};
