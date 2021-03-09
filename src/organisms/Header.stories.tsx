import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Header, { IHeader } from "./Header";

export default {
  title: "Components/Header",
  component: Header,
} as Meta;

const Template: Story<IHeader> = (args) => <Header {...args} />;

export const HeaderDesktop = Template.bind({});
HeaderDesktop.args = {};
