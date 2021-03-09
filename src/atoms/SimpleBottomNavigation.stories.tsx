import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import SimpleBottomNavigation from "./SimpleBottomNavigation";

export default {
  title: "Components/MobileNavigation",
  component: SimpleBottomNavigation,
} as Meta;

const Template: Story = () => <SimpleBottomNavigation />;

export const MobileNavigation = Template.bind({});
MobileNavigation.args = {};
