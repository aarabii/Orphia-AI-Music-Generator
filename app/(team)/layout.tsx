import { ReactNode } from "react";

const TeamLayout = ({ children }: { children: ReactNode }) => {
  return <div className="h-full dark:bg-[#080402]">{children}</div>;
};

export default TeamLayout;
