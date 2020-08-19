import React from 'react';
import { Canvas } from './Canvas';
import { MenuBar } from './ui/MenuBar';
import { Box, Grid, Container } from '@material-ui/core';
import './App.css';
import { ResizableSideBar, ResizableSideBarProps } from './ui/SideBar';

export const App = () => (
  <Grid
    container
    direction="column"
    justify="flex-start"
    alignItems="stretch"
    wrap="nowrap"
  >
    <MenuBar />
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="stretch"
      wrap="nowrap"
      style={{
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
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

      <Canvas />

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
    </Grid>
  </Grid>
);
