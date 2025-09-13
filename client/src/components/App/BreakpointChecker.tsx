import type { FC } from "react";

export const BreakpointChecker: FC = () => {
  return (
    <>
      <div
        id="breakpoint-xxs"
        className="hidden xxs:block xs:hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden w-0 h-0"
      ></div>
      <div
        id="breakpoint-xs"
        className="hidden xs:block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden w-0 h-0"
      ></div>
      <div
        id="breakpoint-sm"
        className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden w-0 h-0"
      ></div>
      <div
        id="breakpoint-md"
        className="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden w-0 h-0"
      ></div>
      <div
        id="breakpoint-lg"
        className="hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden w-0 h-0"
      ></div>
      <div
        id="breakpoint-xl"
        className="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden w-0 h-0"
      ></div>
      <div
        id="breakpoint-2xl"
        className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block w-0 h-0"
      ></div>
    </>
  );
};
