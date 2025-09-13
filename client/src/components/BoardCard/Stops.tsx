import { type FC } from "react";

export interface StopsProps {
  target: string;
  stops: string[];
}

export const Stops: FC<StopsProps> = ({ target, stops }) => {
  return (
    <div className="text-lg w-full truncate text-wrap text-left">
      <span className="font-black">{target}</span>
      <span className="font-light">
        {stops.length > 0 && (
          <>
            {target && " - "}
            {stops.join(" - ")}
          </>
        )}
      </span>
    </div>
  );
};
