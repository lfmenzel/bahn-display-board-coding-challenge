import { type FC } from "react";
import { Configure } from "@/components/App/Configure.tsx";

export const Footer: FC = () => {
  return (
    <div className="flex flex-row w-full gap-1 p-2">
      <div className="xs:hidden flex flex-row w-full gap-1">
        <Configure />
      </div>
      <div className="text-muted-foreground text-right opacity-50 text-xs w-full">
        Lars F. Menzel
      </div>
    </div>
  );
};
