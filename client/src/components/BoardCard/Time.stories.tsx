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
    timePlanned: "2025-09-14T10:00:00",
    timeCurrent: "2025-09-14T10:23:00",
  },
};

export const timeOnTime: Story = {
  args: {
    timePlanned: "2025-09-14T10:00:00",
    timeCurrent: "2025-09-14T10:00:00",
  },
};

export const timeUnclear: Story = {
  args: {
    timePlanned: "2025-09-14T10:00:00",
  },
};
