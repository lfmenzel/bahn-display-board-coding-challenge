import type { Meta, StoryObj } from "@storybook/react";

import { TrainSign } from "@/components/BoardCard";

import "@/css/index.css";

const meta = {
  title: "BoardCard/TrainSign",
  component: TrainSign,
  tags: ["autodocs"],
} satisfies Meta<typeof TrainSign>;

export default meta;
type Story = StoryObj<typeof meta>;

export const trainSignICE: Story = {
  args: {
    type: "ICE",
    train: "ICE 1216",
  },
};

export const trainSignSBahn: Story = {
  args: {
    type: "SBAHN",
    train: "S 14",
  },
};

export const trainSignTRAM: Story = {
  args: {
    type: "TRAM",
    train: "4",
  },
};

export const trainSignBus: Story = {
  args: {
    type: "BUS",
    train: "68",
  },
};

export const trainSignREGIONAL: Story = {
  args: {
    type: "REGIONAL",
    train: "RE 1524",
  },
};

export const trainSignECIC: Story = {
  args: {
    type: "EC_IC",
    train: "EC 14",
  },
};

export const trainSignIR: Story = {
  args: {
    type: "IR",
    train: "IR 1724",
  },
};
