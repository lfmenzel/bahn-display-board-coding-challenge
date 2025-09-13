import { type FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "../ui/button";

export interface SwitcherProps {
  options: string[];
  label?: string;
  unit?: string;
  selected: string;
  onChange: (selected: string) => void;
  className?: string;
}

export const Switcher: FC<SwitcherProps> = ({
  options,
  label,
  unit,
  selected,
  onChange,
  className,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={className}>
          <span className="text-xs">
            {label} {selected} {unit}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="border-accent">
        {[...options].map((value: string) => (
          <DropdownMenuItem onClick={() => onChange(value)} key={value}>
            {label} {value} {unit}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
