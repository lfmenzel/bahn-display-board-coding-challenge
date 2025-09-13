import { type FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/components/App/helper.ts";

export interface BlockProps {
  children: ReactNode[] | ReactNode;
  key?: string;
  header?: string;
  className?: string;
}

export const Block: FC<BlockProps> = ({ children, key, header, className }) => {
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        "border-1 border-accent p-4 bg-card h-full rounded-lg text-foreground break-inside-avoid",
        className,
      )}
      key={key}
    >
      <div className="text-xl text-foreground mb-2">
        {header && t(`${header}.header`)}
      </div>
      {children}
    </div>
  );
};
