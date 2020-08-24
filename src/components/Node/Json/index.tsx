import model from './JsonModel';
import widget from './JsonWidget';

import { Component } from '../../../core';

export default new Component({
  type: 'Json',
  name: 'Json',
  description: 'Create a Json object',
  model,
  widget,
});