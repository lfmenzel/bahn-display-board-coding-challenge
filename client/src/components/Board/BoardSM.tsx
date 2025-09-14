import { type FC } from "react";

import { Board } from "@/components/Board";
import { useAppSelector } from "@/redux";
import { Connection, Meldung } from "@/api/connections.ts";
import { BoardCard } from "@/components/BoardCard";
import { Footer } from "@/components/App";

export const BoardSM: FC = () => {
  const { selectedStation, departures, arrivals } = useAppSelector(
    (state) => state.board,
  );

  return (
    selectedStation && (
      <div className="overflow-y-auto overflow-x-hidden min-h-screen max-h-screen pb-18">
        {selectedStation && (
          <div className="text-foreground text-3xl mt-4 mb-0 p-2 bg-muted-foreground/5 border-1 border-accent">
            {selectedStation.name}
          </div>
        )}
        <div className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 w-full mt-4">
          <Board
            label="departures"
            children={
              departures
                ? departures.map((departure: Connection, index: number) => (
                    <BoardCard
                      key={`departures-${index}`}
                      journeyId={departure.journeyId}
                      type={departure.verkehrmittel?.produktGattung || ""}
                      trackPlanned={departure.gleis}
                      trackCurrent={departure.ezGleis}
                      train={departure.verkehrmittel?.name || ""}
                      timePlanned={departure.zeit}
                      timeCurrent={departure.ezZeit}
                      target={departure.terminus}
                      stops={departure.ueber}
                      messages={[...departure.meldungen]
                        .filter(
                          (meldung: Meldung) => meldung.prioritaet != "HOCH",
                        )
                        .map((meldung: Meldung) => meldung.text)}
                      messagesImportant={[...departure.meldungen]
                        .filter(
                          (meldung: Meldung) => meldung.prioritaet == "HOCH",
                        )
                        .map((meldung: Meldung) => meldung.text)}
                    />
                  ))
                : []
            }
          />

          <Board
            label="arrivals"
            children={
              arrivals
                ? arrivals.map((arrival: Connection, index: number) => (
                    <BoardCard
                      key={`arrivals-${index}`}
                      journeyId={arrival.journeyId}
                      type={arrival.verkehrmittel?.produktGattung || ""}
                      trackPlanned={arrival.gleis}
                      trackCurrent={arrival.ezGleis}
                      train={arrival.verkehrmittel?.name || ""}
                      timePlanned={arrival.zeit}
                      timeCurrent={arrival.ezZeit}
                      target={arrival.terminus}
                      stops={arrival.ueber}
                      messages={[...arrival.meldungen]
                        .filter(
                          (meldung: Meldung) => meldung.prioritaet != "HOCH",
                        )
                        .map((meldung: Meldung) => meldung.text)}
                      messagesImportant={[...arrival.meldungen]
                        .filter(
                          (meldung: Meldung) => meldung.prioritaet == "HOCH",
                        )
                        .map((meldung: Meldung) => meldung.text)}
                    />
                  ))
                : []
            }
          />
        </div>
        <Footer />
      </div>
    )
  );
};
