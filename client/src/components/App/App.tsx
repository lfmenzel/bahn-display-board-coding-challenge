import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/redux";
import { cn, useLayout } from "@/components/App/helper";
import { setBreakpoint } from "@/redux/app";
import { BreakpointChecker } from "@/components/App";

import "@/css/index.css";
import { StationPage } from "@/pages";

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

  return (
    <main className={cn("h-full text-center bg-background")}>
      <div
        className="min-h-screen max-h-screen w-full overflow-y-auto overflow-x-hidden p-2 md:p-4"
        ref={layoutRef}
      >
        <StationPage />
        <BreakpointChecker />
      </div>
    </main>
  );
};
