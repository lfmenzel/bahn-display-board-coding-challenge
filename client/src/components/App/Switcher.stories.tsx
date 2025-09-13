import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useArgs } from "@storybook/preview-api";

import { type SwitcherProps, Switcher } from "@/components/App";

import "@/css/index.css";

const meta = {
  title: "General/Switcher",
  component: Switcher,
  tags: ["autodocs"],
  args: {
    options: ["first", "second"],
    selected: "first",
    onChange: fn(),
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [args, updateArgs] = useArgs<SwitcherProps>();

    const onChange = (selected: string) => {
      updateArgs({ selected });
    };

    return <Switcher {...args} onChange={onChange} />;
  },
} satisfies Meta<typeof Switcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const switcher: Story = {};
