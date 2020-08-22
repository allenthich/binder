import React from 'react';
import { ResizableSideBar, ResizableSideBarProps } from '../ui/SideBar';

export const LSideBarWidget = (props: ResizableSideBarProps) => {
  return (
    <ResizableSideBar
      className='menuBar'
      size={{
        width: '140px',
        height: 'auto',
      }}
      enable={{ right: true }}
      maxWidth="70%"
      minWidth="1"
    >
      <div className='content'>
        Side Bar
      </div>
    </ResizableSideBar>
  )
}