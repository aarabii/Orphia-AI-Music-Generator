import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export const UserAvatar = ({
  isExpandedValue = true,
}: {
  isExpandedValue?: boolean;
}) => {
  const user = useUser();

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-9 w-9">
        <AvatarImage
          src={user.user?.imageUrl}
          alt={`${user.user?.firstName}'s avatar`}
        />
        <AvatarFallback>{user.user?.firstName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className={cn("sidebar-item-text", !isExpandedValue && "hidden")}>
        <p className="text-sm font-medium">{user.user?.fullName}</p>
        <p className="text-xs text-muted-foreground">{user.user?.username}</p>
      </div>
      <SignOutButton>
        <button className="ml-auto flex items-center gap-1 text-sm text-red-500 hover:text-red-700">
          <LogOut size={18} />
        </button>
      </SignOutButton>
    </div>
  );
};
