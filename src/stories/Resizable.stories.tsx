import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { ResizableSideBar, ResizableSideBarProps } from '../ui/SideBar';

export default {
  title: 'UI/Resizable',
  component: ResizableSideBar,
} as Meta;

const Template: Story<ResizableSideBarProps> = (args) => <ResizableSideBar {...args} />;

export const SideBar = Template.bind({});
SideBar.args = {
  enableVertical: true,
  enableHorizontal: true,
  enableCorners: true,
};
