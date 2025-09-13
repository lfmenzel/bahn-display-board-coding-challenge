import type { Meta, StoryObj } from "@storybook/react";

import { Block } from "@/components/Container";

import "@/css/index.css";

const meta = {
  title: "General/Block",
  component: Block,
  tags: ["autodocs"],
} satisfies Meta<typeof Block>;

export default meta;
type Story = StoryObj<typeof meta>;

export const blockElement: Story = {
  args: {
    children: "Elements",
    header: "header",
  },
};
