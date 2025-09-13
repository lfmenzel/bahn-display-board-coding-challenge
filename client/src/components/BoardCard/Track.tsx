import { type FC } from "react";
import { InfoIcon, TrainTrack } from "lucide-react";

import { cn } from "@/components/App/helper.ts";

export interface TrackProps {
  trackPlanned: string;
  trackCurrent?: string;
}

export const Track: FC<TrackProps> = ({ trackPlanned, trackCurrent }) => {
  return (
    <div
      className={cn(
        "font-semibold truncate my-1",
        trackCurrent && "text-error",
      )}
    >
      <div className="flex flex-row items-center justify-center">
        {trackCurrent && <InfoIcon className="min-w-3 max-w-3 mr-1" />}
        <TrainTrack className="min-w-3 max-w-3 mr-1 -rotate-45" />
        {trackPlanned}
      </div>
    </div>
  );
};
