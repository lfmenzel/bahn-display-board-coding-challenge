import type { Meta, StoryObj } from "@storybook/react";

import { Track } from "@/components/BoardCard";

import "@/css/index.css";

const meta = {
  title: "BoardCard/Track",
  component: Track,
  tags: ["autodocs"],
} satisfies Meta<typeof Track>;

export default meta;
type Story = StoryObj<typeof meta>;

export const trackDifferent: Story = {
  args: {
    trackPlanned: "2a",
    trackCurrent: "14",
  },
};

export const trackSame: Story = {
  args: {
    trackPlanned: "7",
  },
};
