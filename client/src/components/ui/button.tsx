import { ComponentProps } from "react";
import { type VariantProps } from "class-variance-authority";

import { Slot } from "@radix-ui/react-slot";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { cn } from "@/components/App/helper.ts";

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
