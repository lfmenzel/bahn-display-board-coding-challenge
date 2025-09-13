import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Board } from "@/components/Board";
import { useAppSelector } from "@/redux";
import { Connection, Meldung } from "@/api/connections.ts";
import { BoardCard } from "@/components/BoardCard";
import { formatDate } from "@/components/App/helper.ts";

export const BoardSM: FC = () => {
  const { t } = useTranslation();

  const { selectedStation, departures, arrivals } = useAppSelector(
    (state) => state.board,
  );

  return (
    selectedStation && (
      <div className="overflow-y-auto overflow-x-hidden min-h-screen max-h-screen">
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
                ? departures.map((departure: Connection, index: number) => (
                    <BoardCard
                      key={`departures-${index}`}
                      journeyId={departure.journeyId}
                      type={departure.verkehrmittel?.produktGattung || ""}
                      trackPlanned={departure.gleis}
                      trackCurrent={departure.ezGleis}
                      train={departure.verkehrmittel?.name || ""}
                      timePlanned={formatDate(departure.zeit, "time", t)}
                      timeCurrent={formatDate(departure.ezZeit, "time", t)}
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
                      timePlanned={formatDate(arrival.zeit, "time", t)}
                      timeCurrent={formatDate(arrival.ezZeit, "time", t)}
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
      </div>
    )
  );
};
