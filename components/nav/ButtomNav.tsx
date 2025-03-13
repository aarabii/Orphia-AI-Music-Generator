import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { bottomNavItems } from "@/constants/nav-values";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const BottomNav = ({
  isExpandedValue,
  pathnameValue,
}: {
  isExpandedValue: boolean;
  pathnameValue: string;
}) => {
  return (
    <nav className="grid gap-2">
      <TooltipProvider delayDuration={0}>
        {bottomNavItems.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                  item.href === pathnameValue &&
                    "bg-primary/10 text-primary font-medium"
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
