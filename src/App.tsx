import React from 'react';
import Canvas from './Canvas';
import {TopMenuBar} from './ui/TopMenu/TopMenuBar';
import { Box, Grid, Container } from '@material-ui/core';
import './App.css';

function App() {
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      wrap="nowrap"
    >
      <TopMenuBar />
      <Canvas />
    </Grid>
  );
}

export default App;
