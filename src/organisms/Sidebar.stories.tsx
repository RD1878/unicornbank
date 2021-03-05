import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Sidebar, { IProps } from "./Sidebar";

export default {
  title: "Components/Sidebar",
  component: Sidebar,
} as Meta;

const Template: Story<IProps> = (args) => <Sidebar {...args} />;

export const SidebarDesktop = Template.bind({});
SidebarDesktop.args = {};
