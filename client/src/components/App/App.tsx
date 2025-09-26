import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/redux";
import { cn, useLayout } from "@/components/App/helper";
import { setBreakpoint } from "@/redux/app";
import { BreakpointChecker } from "@/components/App";

import "@/css/index.css";
import { StationPage } from "@/pages";
import { refreshConnections } from "@/redux/board.ts";
import { RouteComponent } from "@/components/App/Route.tsx";
import { StartPage } from "@/pages/StartPage.tsx";

export const App = () => {
  const {
    i18n: { changeLanguage },
  } = useTranslation();
  const { language } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();
  const { layoutRef, breakpoint } = useLayout();

  useEffect(() => {
    if (breakpoint) {
      dispatch(setBreakpoint(breakpoint));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpoint]);

  useEffect(() => {
    if (language === "<>") {
      changeLanguage(navigator.language.substring(0, 2) == "de" ? "de" : "en");
    } else {
      changeLanguage(language);
    }
  }, [language, changeLanguage]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      dispatch(refreshConnections());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <main className={cn("h-full text-center bg-background overflow-hidden")}>
      <div
        className="min-h-screen max-h-screen w-full p-2 md:p-4"
        ref={layoutRef}
      >
        <BrowserRouter>
          <Routes>
            {RouteComponent("/", <StartPage />)}
            {RouteComponent("/board", <StationPage />, false)}
          </Routes>
          <BreakpointChecker />
        </BrowserRouter>
      </div>
    </main>
  );
};
