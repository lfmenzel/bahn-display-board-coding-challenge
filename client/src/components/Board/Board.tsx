import { type FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Block } from "@/components/Container";

export interface BoardProps {
  label: string;
  children?: ReactNode[] | ReactNode;
}

export const Board: FC<BoardProps> = ({ label, children }) => {
  const { t } = useTranslation();

  return (
    <Block
      header={`stationPage.${label}`}
      className="min-w-[300px] bg-muted-foreground/5 border-1 border-accent -mb-3"
    >
      {children ? (
        children
      ) : (
        <div className="text-muted-foreground">
          {t(`stationPage.${label}.empty`)}
        </div>
      )}
    </Block>
  );
};
