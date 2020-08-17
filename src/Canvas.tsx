import React, { FunctionComponent } from 'react';
import createEngine, { DiagramEngine, DiagramModel, DefaultNodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const CanvasContainer: FunctionComponent<any> = (props: any) => {
  // Setup the diagram engine and model
  const engine = createEngine();
  const model = new DiagramModel();
  model.setGridSize(50);

  // Ensure engine has a model to intialize
  engine.setModel(model);

  return <CanvasWidget engine={engine} />;
}

export function Canvas (props?: any) {
  const useStyles = makeStyles({
    // Style rule
    root: (props: { color: string; background: string }) => ({
      minHeight: '100vh',
      height: '100%',
      minWidth: '30%',
      width: '100%',
      backgroundColor: 'rgb(60, 60, 60) !important',
      backgroundSize: '50px 50px',
      // display: 'flex',
      background: props.background,
      '> *': {
        height: '100%',
        minHeight: '100%',
        width: '100%',
      },
      backgroundImage: `linear-gradient(
        0deg,
        transparent 24%,
        ${props.color} 25%,
        ${props.color} 26%,
        transparent 27%,
        transparent 74%,
        ${props.color} 75%,
        ${props.color} 76%,
        transparent 77%,
        transparent
      ),
      linear-gradient(
        90deg,
        transparent 24%,
        ${props.color} 25%,
        ${props.color} 26%,
        transparent 27%,
        transparent 74%,
        ${props.color} 75%,
        ${props.color} 76%,
        transparent 77%,
        transparent
      )`
    }),

  });
  const classes = useStyles({
    color: 'rgba(255,255,255, 0.05)',
    background: 'rgb(60, 60, 60)',
  });

  return (
    <div
      className={classes.root}
    >
      <CanvasContainer />
    </div>
  );
}

// function exampleSetup () {
//   // Create a default node
//   let node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
//   let port1 = node1.addOutPort('Out');
//   node1.setPosition(100, 100);

//   // Create another default node
//   let node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
//   let port2 = node2.addInPort('In');
//   node2.setPosition(400, 100);

//   // Link the ports
//   let link1 = port1.link<DefaultLinkModel>(port2);
//   link1.getOptions().testName = 'Test';
//   link1.addLabel('Hello World!');

//   // Add the models to the root graph
//   model.addAll(node1, node2, link1);

//   // Load model into engine
//   engine.setModel(model);
// }