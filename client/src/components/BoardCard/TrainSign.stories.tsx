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
    train: "ICE 1652",
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
    train: "STR 4",
  },
};

export const trainSignBus: Story = {
  args: {
    type: "BUS",
    train: "Bus 68",
  },
};

export const trainSignREGIONAL: Story = {
  args: {
    type: "REGIONAL",
    train: "RE 16507",
  },
};

export const trainSignECIC: Story = {
  args: {
    type: "EC_IC",
    train: "EC 459",
  },
};

export const trainSignIR: Story = {
  args: {
    type: "IR",
    train: "IR 1724",
  },
};

export const trainSignUBAHN: Story = {
  args: {
    type: "UBAHN",
    train: "U 4",
  },
};

export const trainSignSCHIFF: Story = {
  args: {
    type: "SCHIFF",
    train: "Fäh 62",
  },
};

export const trainSignANRUFPFLICHTIG: Story = {
  args: {
    type: "ANRUFPFLICHTIG",
    train: "ANRUF",
  },
};
