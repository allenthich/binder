import React from 'react';
import { ResizableSideBar, ResizableSideBarProps } from './UI/SideBar';
import { TrayItem } from './UI/TrayItem';

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
        <TrayItem modelType={{ type: 'Json' }} name="Json Node" color="rgb(192,255,0)" />
        <TrayItem modelType={{ type: 'out', color: 'rgb(0,192,255)' }} name="Out Node" color="rgb(0,192,255)" />
      </div>
    </ResizableSideBar>
  )
}