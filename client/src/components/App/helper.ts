import { useEffect, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { TFunction } from "i18next";

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
  return format(new Date(value), t(`format.${variant}`));
};
