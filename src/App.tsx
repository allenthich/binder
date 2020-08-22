import React, { useState } from 'react';
import { HeaderWidget } from './components/HeaderWidget';
import { BodyWidget } from './components/BodyWidget';
import { Grid } from '@material-ui/core';
import './App.css';
import createEngine, { DiagramEngine, DiagramModel, DefaultNodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';

export const App = () => {
  // Setup the diagram model
  const [ model, setModel ] = useState<DiagramModel>(new DiagramModel());
  model.setGridSize(50);

  // Setup diagram engine and ensure it has a model to intialize
  const [ engine, setEngine ] = useState<DiagramEngine>(createEngine());
  engine.setModel(model);

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      wrap="nowrap"
    >
      <HeaderWidget />
      <BodyWidget engine={engine}/>
    </Grid>
  );
}
