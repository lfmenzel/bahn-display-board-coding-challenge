import type { Meta, StoryObj } from "@storybook/react";

import { Time } from "@/components/BoardCard";

import "@/css/index.css";

const meta = {
  title: "BoardCard/Time",
  component: Time,
  tags: ["autodocs"],
} satisfies Meta<typeof Time>;

export default meta;
type Story = StoryObj<typeof meta>;

export const timeDelayed: Story = {
  args: {
    timePlanned: "20:20",
    timeCurrent: "20:50",
  },
};

export const timeOnTime: Story = {
  args: {
    timePlanned: "20:20",
    timeCurrent: "20:20",
  },
};

export const timeUnklear: Story = {
  args: {
    timePlanned: "20:20",
  },
};
