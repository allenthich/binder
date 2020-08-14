import React from 'react';
import styled from '@emotion/styled';
import createEngine, { DiagramEngine, DiagramModel, DefaultNodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import Grid from '@material-ui/core/Grid';

/**
 * Canvas Wrapper Container
 */
const CanvasContainer = styled.div<{ color: string; background: string }>`
  min-height: 100vh;
  height: 100%;
  background-color: rgb(60, 60, 60) !important;
  background-size: 50px 50px;
  display: flex;
  > * {
    height: 100%;
    min-height: 100%;
    width: 100%;
  }
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      ${p => p.color} 25%,
      ${p => p.color} 26%,
      transparent 27%,
      transparent 74%,
      ${p => p.color} 75%,
      ${p => p.color} 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      ${p => p.color} 25%,
      ${p => p.color} 26%,
      transparent 27%,
      transparent 74%,
      ${p => p.color} 75%,
      ${p => p.color} 76%,
      transparent 77%,
      transparent
    );
`;

interface CanvasProps {
  color?: string;
	background?: string;
}

type CanvasState = {
  engine: DiagramEngine;
  model: DiagramModel;
}

class Canvas extends React.Component<CanvasProps, CanvasState> {
  constructor (props: CanvasProps) {
    super(props)

    // Setup the diagram engine and model
    this.state = {
      engine: createEngine(),
      model: new DiagramModel()
    }
    // Ensure engine has a model to intialize
    this.state.engine.setModel(this.state.model);
  }

  exampleSetup () {
    // Create a default node
    let node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
    let port1 = node1.addOutPort('Out');
    node1.setPosition(100, 100);
  
    // Create another default node
    let node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
    let port2 = node2.addInPort('In');
    node2.setPosition(400, 100);
  
    // Link the ports
    let link1 = port1.link<DefaultLinkModel>(port2);
    link1.getOptions().testName = 'Test';
    link1.addLabel('Hello World!');

    // Add the models to the root graph
    this.state.model.addAll(node1, node2, link1);

    // Load model into engine
    this.state.engine.setModel(this.state.model);
  }

  render () {
    return (
      <Grid item xs={12}>
        <CanvasContainer
          background={this.props.background || 'rgb(60, 60, 60)'}
          color={this.props.color || 'rgba(255,255,255, 0.05)'}>
          <CanvasWidget engine={this.state.engine} />
          {this.props.children}
        </CanvasContainer>
      </Grid>
    );
  }
}

export default Canvas;
