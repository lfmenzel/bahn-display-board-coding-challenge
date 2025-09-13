import { type FC } from "react";

import { cn } from "@/components/App/helper.ts";

export interface TrainSignProps {
  type: string;
  train: string;
}

export const TrainSign: FC<TrainSignProps> = ({ type, train }) => {
  let trainColor: string = "bg-fuchsia-700";
  switch (type) {
    case "REGIONAL":
      trainColor = "bg-gray-400";
      break;
    case "ICE":
      trainColor = "bg-gray-800";
      break;
    case "EC_IC":
      trainColor = "bg-blue-800";
      break;
    case "SBAHN":
      trainColor = "bg-green-700";
      break;
    case "IR":
      trainColor = "bg-orange-400";
  }
  return (
    <div
      className={cn(
        "text-sm font-semibold truncate rounded-sm px-1 text-background",
        trainColor,
      )}
    >
      {train}
    </div>
  );
};
