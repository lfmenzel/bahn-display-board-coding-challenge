import { type FC } from "react";

import { Board } from "@/components/Board";
import { useAppSelector } from "@/redux";
import { BoardEvent } from "@/api/events.ts";

export const BoardSM: FC = () => {
  const { selectedStation, departures, arrivals } = useAppSelector(
    (state) => state.board,
  );

  return (
    selectedStation && (
      <div>
        {selectedStation && (
          <div className="text-foreground text-2xl my-4">
            {selectedStation.name}
          </div>
        )}
        <div className="grid grid-flow-row gap-2 grid-cols-1 sm:grid-cols-2 w-full mt-4">
          <Board
            label="departures"
            children={
              departures
                ? departures.map((departure: BoardEvent, index: number) => (
                    <div className="text-foreground" key={index}>
                      {departure.zeit}: {departure.terminus}
                    </div>
                  ))
                : []
            }
          />

          <Board
            label="arrivals"
            children={
              arrivals
                ? arrivals.map((arrival: BoardEvent, index: number) => (
                    <div className="text-foreground" key={index}>
                      {arrival.zeit}: {arrival.terminus}
                    </div>
                  ))
                : []
            }
          />
        </div>
      </div>
    )
  );
};
