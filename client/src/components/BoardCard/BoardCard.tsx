import { type FC } from "react";

import { Card } from "@/components/ui";
import { cn } from "@/components/App/helper.ts";
import { Time } from "@/components/BoardCard/Time.tsx";

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
}) => {
  const timeColor: string = timeCurrent
    ? timePlanned != timeCurrent
      ? "bg-semantic-error/5 border-semantic-error/15"
      : "bg-semantic-success/2.5 border-semantic-success/12.5"
    : "bg-muted-foreground/2.5 border-muted-foreground/25";
  return (
    <Card
      key={journeyId}
      className={cn(
        "bg-card min-w-[250px] rounded-lg w-full mb-4 flex-row p-0",
        timeColor,
      )}
    >
      <div className="min-w-[80px] max-w-[80px] justify-center items-center ml-5 mt-1">
        <Time timePlanned={timePlanned} timeCurrent={timeCurrent} />
      </div>

      <div
        className={cn(
          "w-full grow rounded-r-xl p-1 border-l-1 px-2",
          timeColor,
        )}
      >
        {target}
      </div>
    </Card>
  );
};
