import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PrimaryButton from "./PrimaryButton";
import { ButtonProps } from "@material-ui/core/Button";

export default {
  title: "Components/PrimaryButton",
  component: PrimaryButton,
} as Meta;

const Template: Story<ButtonProps> = (args) => <PrimaryButton {...args} />;

export const Medium = Template.bind({});
Medium.args = {
  size: "medium",
  children: "Button",
};

export const Large = Template.bind({});
Large.args = {
  ...Medium.args,
  size: "large",
};
