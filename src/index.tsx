import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Canvas from './Canvas';
import { UiWidget, Button } from './ui/UInterfaceWidget';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <UiWidget buttons={<Button onClick={() => console.log('btnclick')}>Button</Button>}>
    <Canvas />
  </UiWidget>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
