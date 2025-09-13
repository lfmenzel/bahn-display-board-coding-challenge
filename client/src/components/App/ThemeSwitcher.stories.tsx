import type { Meta, StoryObj } from "@storybook/react";

import { ThemeSwitcher } from "@/components/App";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";
import { ThemeSwitcherProps } from "./ThemeSwitcher";

import "@/css/index.css";

const meta = {
  title: "General/Switcher",
  component: ThemeSwitcher,
  tags: ["autodocs"],
  args: {
    themeMode: "dark",
    themeModes: ["system", "dark", "light"],
    setThemeMode: fn(),
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [args, updateArgs] = useArgs<ThemeSwitcherProps>();

    const setThemeMode = (themeMode: string) => {
      updateArgs({ themeMode });
    };

    return <ThemeSwitcher {...args} setThemeMode={setThemeMode} />;
  },
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const themeSwitcher: Story = {};
