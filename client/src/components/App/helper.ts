import { useEffect, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { TFunction } from "i18next";
import { Station } from "@/api/stations.ts";
import { Option } from "@/components/Searchbar/SearchAndSelect.tsx";

export const getCurrentBreakpoint = (): string => {
  const breakpointXXS: string | null =
    document.getElementById("breakpoint-xxs")?.offsetParent === null
      ? null
      : "xxs";
  const breakpointXS: string | null =
    document.getElementById("breakpoint-xs")?.offsetParent === null
      ? null
      : "xs";
  const breakpointSM: string | null =
    document.getElementById("breakpoint-sm")?.offsetParent === null
      ? null
      : "sm";
  const breakpointMD: string | null =
    document.getElementById("breakpoint-md")?.offsetParent === null
      ? null
      : "md";
  const breakpointLG: string | null =
    document.getElementById("breakpoint-lg")?.offsetParent === null
      ? null
      : "lg";
  const breakpointXL: string | null =
    document.getElementById("breakpoint-xl")?.offsetParent === null
      ? null
      : "xl";
  const breakpoint2XL: string | null =
    document.getElementById("breakpoint-2xl")?.offsetParent === null
      ? null
      : "2xl";
  return (
    breakpointXXS ??
    breakpointXS ??
    breakpointSM ??
    breakpointMD ??
    breakpointLG ??
    breakpointXL ??
    breakpoint2XL ??
    "mobile"
  );
};

export function useLayout() {
  const layoutRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [breakpoint, setBreakpoint] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !layoutRef.current) return;
    setHeight(layoutRef.current.clientHeight);
    setWidth(layoutRef.current.clientWidth);
  }, [isMounted]);

  useEffect(() => {
    const handleResize = () => {
      if (!isMounted || !layoutRef.current) return;
      setHeight(layoutRef.current.clientHeight);
      setWidth(layoutRef.current.clientWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (!isMounted || !layoutRef.current) return;
    setBreakpoint(getCurrentBreakpoint());
  }, [width, isMounted]);

  return { layoutRef, height, width, breakpoint };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (
  value: string,
  variant: "dateTime" | "date" | "time",
  t: TFunction<"translation", undefined>,
) => {
  if (!value) {
    return "";
  }
  // TODO Add i18N to Storybook to avoid this
  const formatString = t(`format.${variant}`);
  return formatString == "format.time"
    ? format(new Date(value), "HH:mm")
    : format(new Date(value), formatString);
};

export const formatTechnicalDate = (
  value: string,
  t: TFunction<"translation", undefined>,
) => {
  if (!value) {
    return "";
  }
  return format(new Date(value), t(`format.dateTechnical`));
};

export const formatTechnicalTime = (
  value: string,
  t: TFunction<"translation", undefined>,
) => {
  if (!value) {
    return "";
  }
  return format(new Date(value), t(`format.timeTechnical`));
};

export const formatTechnicalDateTime = (
  value: Date,
  t: TFunction<"translation", undefined>,
) => {
  if (!value) {
    return { date: "", time: "" };
  }
  const dateTime = value.toUTCString();
  const date = formatTechnicalDate(dateTime, t);
  const time = formatTechnicalTime(dateTime, t);
  return { date: date, time: time };
};

export const differenceOfDates = (datePlanned: string, dateCurrent: string) => {
  const date1 = new Date(datePlanned).getTime();
  const date2 = new Date(dateCurrent).getTime();
  return (date2 - date1) / 1000 / 60;
};

export const setOptionsForStation = (station: Station): Option => {
  return {
    value: station.extId,
    label: station.name,
  };
};
