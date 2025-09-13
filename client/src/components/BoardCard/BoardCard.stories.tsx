import type { Meta, StoryObj } from "@storybook/react";

import { BoardCard } from "@/components/BoardCard";

import "@/css/index.css";

const meta = {
  title: "BoardCard/BoardCard",
  component: BoardCard,
  tags: ["autodocs"],
} satisfies Meta<typeof BoardCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const boardCardLateAndWrongTrack: Story = {
  args: {
    journeyId: "1",
    timePlanned: "9:30",
    timeCurrent: "12:00",
    target: "Dresden",
    train: "ICE",
    type: "ICE 1704",
    trackPlanned: "17",
    trackCurrent: "2",
    stops: ["Riesa", "Leipzig", "Erfurt", "Frankfurt"],
    messagesImportant: ["Grad keine", "Wirklich nicht"],
    messages: ["Kommt später"],
  },
};

export const boardCard: Story = {
  args: {
    journeyId: "2",
    timePlanned: "09:30",
    timeCurrent: "09:30",
    target: "Dresden",
    train: "ICE",
    type: "ICE 1704",
    trackPlanned: "17",
    stops: ["Riesa", "Leipzig", "Erfurt", "Frankfurt"],
    messagesImportant: [],
    messages: ["Alles gut"],
  },
};
