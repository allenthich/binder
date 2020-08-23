import model from './Model';
import widget from './Widget';

import { Component } from '../../../core';

export default new Component({
  type: 'Json',
  name: 'Json',
  description: 'Create a Json object',
  model,
  widget,
});