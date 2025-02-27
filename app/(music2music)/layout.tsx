import { ReactNode } from "react";

const BeatGenerationLayout = ({ children }: { children: ReactNode }) => {
  return <div className="h-full dark:bg-[#080402]">{children}</div>;
};

export default BeatGenerationLayout;
