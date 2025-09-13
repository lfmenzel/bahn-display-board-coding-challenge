import type { Meta, StoryObj } from "@storybook/react";

import { Messages } from "@/components/BoardCard";

import "@/css/index.css";

const meta = {
  title: "BoardCard/Messages",
  component: Messages,
  tags: ["autodocs"],
} satisfies Meta<typeof Messages>;

export default meta;
type Story = StoryObj<typeof meta>;

export const importantMessage: Story = {
  args: {
    messages: ["Dieser Halt entfällt"],
    important: true,
  },
};

export const defaultMessage: Story = {
  args: {
    messages: ["Dieser Zug ist zu spät"],
    important: false,
  },
};
