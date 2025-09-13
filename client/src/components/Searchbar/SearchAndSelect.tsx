import { Command as CommandPrimitive } from "cmdk";
import {
  useState,
  useRef,
  useCallback,
  memo,
  type KeyboardEvent,
  useEffect,
} from "react";
import { Check, X } from "lucide-react";
import { debounce } from "lodash-es";

import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command.tsx";
import { cn } from "@/components/App/helper.ts";

export type Option = Record<"value" | "label", string> & Record<string, string>;

type SearchAndSelectProps = {
  options: Option[];
  emptyMessage: string;
  value?: Option;
  onValueChange?: (value: Option) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  debounceTime?: number;
  className?: string;
};

export const SearchAndSelect = memo(
  ({
    options,
    placeholder,
    emptyMessage,
    value,
    onValueChange,
    onSearch,
    onClear,
    debounceTime = 300,
    className = "",
  }: SearchAndSelectProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setOpen] = useState(false);
    const [selected, setSelected] = useState<Option | undefined>(
      value as Option,
    );
    const [inputValue, setInputValue] = useState<string | undefined>(
      value?.label || undefined,
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;

        if (!input) {
          return;
        }

        if (!isOpen) {
          setOpen(true);
        }

        if (event.key === "Enter" && input.value !== "") {
          const optionToSelect = options.find(
            (option) => option.label === input.value,
          );
          if (optionToSelect) {
            setSelected(optionToSelect);
          }
        }

        if (event.key === "Escape") {
          input.blur();
        }
      },
      [isOpen, options],
    );

    const handleBlur = useCallback(() => {
      setOpen(false);
    }, []);

    const handleSelectOption = useCallback(
      (selectedOption: Option) => {
        setSelected(selectedOption);
        setTimeout(() => {
          inputRef?.current?.blur();
          setInputValue(selectedOption.label);
          onValueChange?.(selectedOption);
        }, 10);
      },
      [onValueChange],
    );

    const clearInput = () => {
      setInputValue("");
      setTimeout(() => {
        setInputValue(undefined);
        setOpen(false);
        onValueChange?.({ value: "", label: "" });
        if (onClear) {
          onClear();
        }
      }, 10);
    };

    const debouncedSearch = debounce((id) => onSearch?.(id), debounceTime, {
      trailing: true,
    });

    useEffect(() => {
      return () => {
        debouncedSearch.cancel();
      };
    });

    return (
      <CommandPrimitive
        onKeyDown={handleKeyDown}
        className={cn("border-accent bg-popover w-full rounded-md", className)}
      >
        <div className="flex flex-row items-center w-full">
          <CommandInput
            ref={inputRef}
            value={inputValue}
            onValueChange={debouncedSearch}
            onBlur={handleBlur}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="text-foreground outline-hidden w-full"
          />
          {inputValue && (
            <X
              className="size-4 opacity-50 text-foreground mr-2.5 mt-1"
              onClick={() => clearInput()}
            />
          )}
        </div>

        <div className="relative mt-1">
          <div
            className={cn(
              "animate-in absolute top-0 text-foreground w-full rounded-md z-20 bg-popover min-w-[250px]",
              isOpen ? "block" : "hidden",
            )}
          >
            <CommandList className="text-foreground shadow-md -mt-1">
              {options.length > 0 ? (
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selected?.value === option.value;
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onSelect={() => handleSelectOption(option)}
                        className={cn(
                          "w-full items-center gap-2 text-foreground text-ellipsis overflow-clip text-left",
                          !isSelected ? "pl-8 text-foreground" : null,
                        )}
                      >
                        {isSelected ? <Check className="w-4" /> : null}
                        {option.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ) : null}
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                {emptyMessage}
              </CommandPrimitive.Empty>
            </CommandList>
          </div>
        </div>
      </CommandPrimitive>
    );
  },
);
