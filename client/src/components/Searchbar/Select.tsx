import { memo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select.tsx";
import { Option } from "@/components/Searchbar/SearchAndSelect.tsx";

import { cn } from "@/components/App/helper.ts";

type SimpleSelectProps = {
  options: Option[];
  value?: Option;
  onValueChange?: (option: Option) => void;
  className?: string;
};

export const SimpleSelect = memo(
  ({ options, onValueChange, className = "" }: SimpleSelectProps) => {
    const handleStringToInt = (value: string) => {
      if (onValueChange) {
        options.forEach((option) => {
          if (option.value == value) {
            onValueChange(option);
          }
        });
      }
    };

    return (
      <Select onValueChange={handleStringToInt}>
        <SelectTrigger
          className={cn(
            "w-full text-foreground text-3xl mt-4 mb-0 p-2 bg-muted-foreground/5 border-1 border-accent justify-center",
            className,
          )}
        ></SelectTrigger>
        <SelectContent className="text-foreground w-full rounded-md z-20 bg-popover min-w-full">
          {options.map((option, index) => (
            <SelectItem
              value={option.value}
              key={`optioon-${index}`}
              className="w-full gap-2 text-foreground text-ellipsis overflow-clip justify-center"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
);
