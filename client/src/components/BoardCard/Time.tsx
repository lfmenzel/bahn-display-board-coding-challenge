import { type FC } from "react";

import { cn, differenceOfDates, formatDate } from "@/components/App/helper.ts";
import { useTranslation } from "react-i18next";

export interface TimeProps {
  timePlanned: string;
  timeCurrent?: string;
}

export const Time: FC<TimeProps> = ({ timePlanned, timeCurrent }) => {
  const { t } = useTranslation();

  const timeDifference =
    timeCurrent &&
    timePlanned != timeCurrent &&
    `+${differenceOfDates(timePlanned, timeCurrent)}`;

  return (
    <>
      <div
        className={cn(
          "text-lg font-semibold truncate",
          timePlanned != timeCurrent
            ? "text-error animate-error"
            : "text-success",
        )}
      >
        {timeCurrent ? formatDate(timeCurrent, "time", t) : undefined}
      </div>
      <div className="text-lg font-semibold truncate">
        {formatDate(timePlanned, "time", t)}
        {timeDifference && (
          <div className="text-error text-xs -mt-1 mb-1 animate-error">
            {timeDifference} {t("search.unit")}
          </div>
        )}
      </div>
    </>
  );
};
