import React from 'react';
import { ResizableSideBar, ResizableSideBarProps } from './UI/SideBar';

export const RSideBarWidget = (props: ResizableSideBarProps) => {
  return (
    <ResizableSideBar
      size={{
        width: '15%',
        height: 'auto',
      }}
      enable={{ left: true }}
      maxWidth="70%"
      minWidth="1"
    >
      Details Panel
    </ResizableSideBar>
  )
}