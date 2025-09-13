import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/button";

import "@/css/index.css";

const meta = {
  title: "General/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const destructiveButton: Story = {
  args: {
    children: "destructive",
    variant: "destructive",
  },
};

export const outlineButton: Story = {
  args: {
    children: "outline",
    variant: "outline",
  },
};

export const secondaryButton: Story = {
  args: {
    children: "secondary",
    variant: "secondary",
  },
};

export const defaultButton: Story = {
  args: {
    children: "default",
    variant: "default",
  },
};

export const ghostButton: Story = {
  args: {
    children: "ghost",
    variant: "ghost",
  },
};

export const linkButton: Story = {
  args: {
    children: "link",
    variant: "link",
  },
};
