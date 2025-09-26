import { type FC, useEffect, useState } from "react";

import { Board } from "@/components/Board";
import { useAppDispatch, useAppSelector } from "@/redux";
import { Connection, Meldung } from "@/api/connections.ts";
import { BoardCard } from "@/components/BoardCard";
import { Footer } from "@/components/App";
import { SimpleSelect } from "@/components/Searchbar/Select.tsx";
import { Option } from "@/components/Searchbar/SearchAndSelect.tsx";
import { setOptionsForStation } from "@/components/App/helper.ts";
import { setSelectedStation } from "@/redux/board.ts";

export const BoardSM: FC = () => {
  const { selectedStation, departures, arrivals, history } = useAppSelector(
    (state) => state.board,
  );

  const dispatch = useAppDispatch();

  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<Option | undefined>(
    selectedStation ? setOptionsForStation(selectedStation) : undefined,
  );

  useEffect(() => {
    if (history?.length > 0) {
      setSelected(undefined);
      setOptions(history.map((station) => setOptionsForStation(station)));
    }
  }, [history]);

  useEffect(() => {
    history.forEach((station) => {
      if (station.extId == selected?.value) {
        dispatch(setSelectedStation(station));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, history]);

  return (
    selectedStation &&
    history && (
      <div className="overflow-y-auto overflow-x-hidden min-h-screen max-h-screen pb-18">
        {history.length > 1 && (
          <SimpleSelect options={options} onValueChange={setSelected} />
        )}
        <div className="text-foreground text-3xl mt-4 mb-0 p-2 bg-muted-foreground/5 border-1 border-accent animate-appear">
          {selectedStation.name}
        </div>
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
