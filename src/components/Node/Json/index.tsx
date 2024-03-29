import { JsonNodeModel } from './JsonModel';
import { JsonNodeWidget } from './JsonWidget';

import { Component } from '../../../core';

export default new Component({
  type: 'Json',
  name: 'Json',
  description: 'Create a Json object',
  model: JsonNodeModel,
  widget: JsonNodeWidget,
});