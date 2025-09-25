import { type FC } from "react";

import { Card } from "@/components/ui";
import { cn } from "@/components/App/helper.ts";
import { Time } from "@/components/BoardCard/Time.tsx";
import { TrainSign } from "@/components/BoardCard/TrainSign.tsx";
import { Track } from "@/components/BoardCard/Track.tsx";
import { Stops } from "@/components/BoardCard/Stops.tsx";
import { Messages } from "@/components/BoardCard/Messages.tsx";

export interface BoardCardProps {
  journeyId: string;
  type: string;
  trackPlanned: string;
  trackCurrent?: string;
  train: string;
  timePlanned: string;
  timeCurrent?: string;
  target: string;
  stops: string[];
  messages: string[];
  messagesImportant: string[];
}

export const BoardCard: FC<BoardCardProps> = ({
  journeyId,
  timePlanned,
  timeCurrent,
  target,
  train,
  type,
  trackPlanned,
  trackCurrent,
  stops,
  messagesImportant,
  messages,
}) => {
  const timeColor: string = timeCurrent
    ? timePlanned != timeCurrent || trackCurrent
      ? "bg-error/5 border-error/15"
      : "bg-success/2.5 border-success/12.5"
    : "bg-muted-foreground/2.5 border-muted-foreground/25";
  return (
    <Card
      key={journeyId}
      className={cn(
        "bg-card min-w-[250px] rounded-lg w-full mb-4 flex-row p-0 animate-appear",
        timeColor,
      )}
    >
      <div className="min-w-[80px] max-w-[80px] justify-center items-center ml-5 mt-1">
        <Time timePlanned={timePlanned} timeCurrent={timeCurrent} />
        <TrainSign train={train} type={type} />
        <Track trackPlanned={trackPlanned} trackCurrent={trackCurrent} />
      </div>

      <div
        className={cn(
          "w-full grow rounded-r-xl p-1 border-l-1 px-2",
          timeColor,
        )}
      >
        <Stops target={target} stops={stops} />
        <Messages messages={messagesImportant} important={true} />
        <Messages messages={messages} important={false} />
      </div>
    </Card>
  );
};
