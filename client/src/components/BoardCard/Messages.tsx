import { type FC } from "react";

import { cn } from "@/components/App/helper.ts";
import { InfoIcon } from "lucide-react";

export interface MessagesProps {
  messages: string[];
  important: boolean;
}

export const Messages: FC<MessagesProps> = ({ messages, important }) => {
  return (
    messages.length > 0 && (
      <div className="text-xs/5.5 font-medium truncate flex flex-col">
        {messages.map((message: string, index: number) => (
          <div
            className={cn(
              "flex flex-row w-full",
              important ? "text-semantic-error" : "text-muted-foreground",
            )}
            key={index}
          >
            <InfoIcon className="min-w-3 max-w-3 -mt-0.25" />
            <div className="text-xs/5.5 font-medium grow text-wrap text-left ml-1">
              {message}
            </div>
          </div>
        ))}
      </div>
    )
  );
};
