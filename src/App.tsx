import React from 'react';
import Canvas from './Canvas';
import { MenuBar } from './ui/MenuBar';
import { Box, Grid, Container } from '@material-ui/core';
import './App.css';

const App = () => (
  <Grid
    container
    direction="column"
    justify="flex-start"
    alignItems="stretch"
    wrap="nowrap"
  >
    <MenuBar />
    <Canvas />
  </Grid>
);

export default App;
