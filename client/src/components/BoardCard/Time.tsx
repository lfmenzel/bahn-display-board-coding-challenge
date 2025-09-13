import { type FC } from "react";

import { cn } from "@/components/App/helper.ts";

export interface TimeProps {
  timePlanned: string;
  timeCurrent?: string;
}

export const Time: FC<TimeProps> = ({ timePlanned, timeCurrent }) => {
  return (
    <>
      <div
        className={cn(
          "text-lg font-semibold truncate",
          timePlanned != timeCurrent ? "text-error" : "text-success",
        )}
      >
        {timeCurrent}
      </div>
      <div className="text-lg font-semibold truncate">{timePlanned}</div>
    </>
  );
};
