import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import createEngine, { DiagramModel, DefaultNodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './helpers/DemoCanvasWidget';

//1) setup the diagram engine
var engine = createEngine();

//2) setup the diagram model
var model = new DiagramModel();

//3-A) create a default node
var node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
let port1 = node1.addOutPort('Out');
node1.setPosition(100, 100);

//3-B) create another default node
var node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
let port2 = node2.addInPort('In');
node2.setPosition(400, 100);

// link the ports
let link1 = port1.link<DefaultLinkModel>(port2);
link1.getOptions().testName = 'Test';
link1.addLabel('Hello World!');

//4) add the models to the root graph
model.addAll(node1, node2, link1);

//5) load model into engine
engine.setModel(model);

ReactDOM.render(
  <DemoCanvasWidget>
    <CanvasWidget engine={engine} />
  </DemoCanvasWidget>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
