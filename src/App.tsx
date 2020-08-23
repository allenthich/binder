import React, { useState } from 'react';
import { HeaderWidget } from './components/HeaderWidget';
import { BodyWidget } from './components/BodyWidget';
import { Grid } from '@material-ui/core';
import './App.css';
import createEngine, { DiagramModel, DefaultNodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';
import components from './components/Node';
import { DiagramEngine } from './core';

export const App = () => {
  const diagram = new DiagramEngine(components);

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      wrap="nowrap"
    >
      <HeaderWidget />
      <BodyWidget engine={diagram} />
    </Grid>
  );
}
