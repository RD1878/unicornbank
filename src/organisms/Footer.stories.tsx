import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Footer from "./Footer";

export default {
  title: "Components/Footer",
  component: Footer,
} as Meta;

const Template: Story = () => <Footer />;

export const FooterDesktop = Template.bind({});
FooterDesktop.args = {};
