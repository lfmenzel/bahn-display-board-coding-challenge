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
    case "TRAM":
      trainColor = "bg-yellow-500";
      break;
    case "IR":
      trainColor = "bg-orange-400";
      break;
    case "SCHIFF":
      trainColor = "bg-teal-400";
      break;
    case "ANRUFPFLICHTIG":
      trainColor = "bg-red-400";
      break;
    case "TAXI":
      trainColor = "bg-yellow-300";
      break;
    case "UBAHN":
      trainColor = "bg-stone-400";
  }
  return (
    <div
      className={cn(
        "text-sm font-semibold truncate rounded-sm px-1 text-background max-w-20",
        trainColor,
      )}
    >
      {train}
    </div>
  );
};
