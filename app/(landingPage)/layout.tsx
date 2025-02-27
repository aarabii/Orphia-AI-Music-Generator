import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return <div className="h-full dark:bg-[#080402]">{children}</div>;
};

export default HomeLayout;
