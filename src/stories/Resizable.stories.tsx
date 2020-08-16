import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { ResizableSideBar, ResizableSideBarProps } from '../ui/SideBar';

export default {
  title: 'UI',
  component: ResizableSideBar,
  argTypes: {
    minWidth: {
      control: 'text'
    },
    minHeight: {
      control: 'text'
    },
  },
} as Meta;

const Template: Story<ResizableSideBarProps> = (args) => <ResizableSideBar {...args} />;

export const ResizableSidebar = Template.bind({});
ResizableSidebar.args = {
  minWidth: '100px',
  minHeight: '100px',
  verticalResizing: true,
  horizontalResizing: true,
  cornerResizing: true,
};
