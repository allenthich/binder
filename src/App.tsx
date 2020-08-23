import React, { useState } from 'react';
import { HeaderWidget } from './components/HeaderWidget';
import { BodyWidget } from './components/BodyWidget';
import { Grid } from '@material-ui/core';
import './App.css';
import createEngine, { DiagramModel, DefaultNodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';
import { DiagramEngine } from './core';

export const App = () => {
  // Setup the diagram model
  // const [ model, setModel ] = useState<DiagramModel>(new DiagramModel());
  // model.setGridSize(50);

  // // Example starter nodes
  // const addDefaultNodes = () => {
  //   //3-A) create a default node
  //   var node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
  //   let port = node1.addOutPort('Out');
  //   node1.setPosition(100, 100);

  //   //3-B) create another default node
  //   var node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
  //   let port2 = node2.addInPort('In');
  //   node2.setPosition(400, 100);

  //   // link the ports
  //   let link1 = port.link(port2);

  //   //4) add the models to the root graph
  //   model.addAll(node1, node2, link1);
  // }
  // addDefaultNodes()

  // Setup diagram engine and ensure it has a model to intialize
  // const [ engine, setEngine ] = useState<DiagramEngine>(createEngine());
  // engine.setModel(model);
  const components = [
    { type: 'in'  },
    { type: 'out' },
  ]
  const diagramEngine = new DiagramEngine();
  debugger;

  // Enable re-render call
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      wrap="nowrap"
    >
      <HeaderWidget />
      <BodyWidget engine={diagramEngine} forceUpdate={forceUpdate}/>
    </Grid>
  );
}
