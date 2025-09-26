import { type FC } from "react";

import { Input } from "@/components/ui/input.tsx";

import { cn } from "@/components/App/helper.ts";

export interface TextFieldProps {
  value?: string;
  name: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error: boolean;
  type?: string;
  className?: string;
}

export const TextField: FC<TextFieldProps> = ({
  value = "",
  name,
  placeholder = "",
  onChange,
  error,
  type = "text",
  className,
}) => {
  const handleChange = (e: { target: { value: string } }) => {
    onChange(e.target.value);
  };

  return (
    <Input
      name={name}
      className={cn(
        "text-foreground",
        className,
        error && "border-error text-error",
      )}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={handleChange}
    />
  );
};
