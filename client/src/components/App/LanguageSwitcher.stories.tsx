import type { Meta, StoryObj } from "@storybook/react";

import { LanguageSwitcher } from "@/components/App";
import { fn } from "@storybook/test";
import { useArgs } from "@storybook/preview-api";
import { LanguageSwitcherProps } from "@/components/App/LanguageSwitcher.tsx";

import "@/css/index.css";

const meta = {
  title: "General/Switcher",
  component: LanguageSwitcher,
  tags: ["autodocs"],
  args: {
    language: "en",
    languages: ["de", "en"],
    setLanguage: fn(),
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [args, updateArgs] = useArgs<LanguageSwitcherProps>();

    const setLanguage = (language: string) => {
      updateArgs({ language });
    };

    return <LanguageSwitcher {...args} setLanguage={setLanguage} />;
  },
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const languageSwitcher: Story = {};
