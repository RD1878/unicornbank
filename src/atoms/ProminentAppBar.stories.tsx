import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import ProminentAppBar, { IHeader } from "./ProminentAppBar";

export default {
  title: "Components/MobileHeader",
  component: ProminentAppBar,
} as Meta;

const Template: Story<IHeader> = (args) => <ProminentAppBar {...args} />;

export const MobileHeader = Template.bind({});
MobileHeader.args = {};
