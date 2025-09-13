import type { Meta, StoryObj } from "@storybook/react";

import { Stops } from "@/components/BoardCard";

import "@/css/index.css";

const meta = {
  title: "BoardCard/Stops",
  component: Stops,
  tags: ["autodocs"],
} satisfies Meta<typeof Stops>;

export default meta;
type Story = StoryObj<typeof meta>;

export const showStops: Story = {
  args: {
    target: "Dresden",
    stops: ["Riesa", "Leipzig", "Erfurt", "Frankfurt"],
  },
};
