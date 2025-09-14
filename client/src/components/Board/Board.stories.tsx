import type { Meta, StoryObj } from "@storybook/react";

import { Board } from "@/components/Board";

import "@/css/index.css";

import { BoardCard } from "@/components/BoardCard";

const meta = {
  title: "Board",
  component: Board,
  tags: ["autodocs"],
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof meta>;

export const boardEmpty: Story = {
  args: {
    label: "ankunft",
  },
};

export const boardWithCard: Story = {
  args: {
    label: "ankunft",
    children: [
      <BoardCard
        key="1"
        journeyId="1"
        timePlanned="09:30:00"
        timeCurrent="09:30:00"
        target="Dresden"
        train="ICE"
        type="ICE 1704"
        trackPlanned="17"
        stops={["Riesa", "Leipzig", "Erfurt", "Frankfurt"]}
        messagesImportant={[]}
        messages={["Alles gut"]}
      />,
      <BoardCard
        key="2"
        journeyId="2"
        timePlanned="09:30:00"
        timeCurrent="09:50:00"
        target="Dresden"
        train="ICE"
        type="ICE 1704"
        trackPlanned="17"
        trackCurrent="2"
        stops={["Riesa", "Leipzig", "Erfurt", "Frankfurt"]}
        messagesImportant={["Fällt aus!"]}
        messages={["Nix gut"]}
      />,
    ],
  },
};
