import React, { useState } from 'react';
import _ from 'lodash';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { LSideBarWidget } from './LSideBarWidget';
import { RSideBarWidget } from './RSideBarWidget';
import createEngine, { DiagramEngine, DiagramModel, DefaultNodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';

export const BodyWidget = (props: any) => {
  const useCanvasStyles = makeStyles({
    // Style rule
    root: (props: { color: string; background: string }) => ({
      minHeight: '100vh',
      height: '100%',
      minWidth: '30%',
      width: '100%',
      backgroundColor: 'rgb(60, 60, 60) !important',
      // backgroundSize: '50px 50px',
      display: 'flex',
      // background: props.background,
      '& > div:first-child': {
        height: '100%',
        minHeight: '100vh',
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
      )`,
    }),
  });
  
  const canvasClasses = useCanvasStyles({
    color: 'rgba(255,255,255, 0.05)',
    background: 'rgb(60, 60, 60)',
  });
  
  return (
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
      <LSideBarWidget />
      <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
      }}>
        <div
          id='canvasWrapper'
          className={canvasClasses.root}
          onDrop={(event) => {
            var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
            // debugger;
            // var nodesCount = _.keys(props.engine.getModel().getNodes()).length;

            // var node: DefaultNodeModel = null;
            // if (data.type === 'in') {
            //   node = new DefaultNodeModel('Node ' + (nodesCount + 1), 'rgb(192,255,0)');
            //   node.addInPort('In');
            // } else {
            //   node = new DefaultNodeModel('Node ' + (nodesCount + 1), 'rgb(0,192,255)');
            //   node.addOutPort('Out');
            // }
            // var point = props.engine.getRelativeMousePoint(event);
            // node.setPosition(point);
            // props.engine.getModel().addNode(node);
            // props.forceUpdate();
            // props.engine.repaint()
            debugger;
            props.engine.handleComponentDrop(event, data);
          }}
          onDragOver={(event) => {
            event.preventDefault();
          }}
        >
          <CanvasWidget engine={props.engine.getEngine()} />
        </div>
      </div>
      <RSideBarWidget />
    </Grid>
  )
}