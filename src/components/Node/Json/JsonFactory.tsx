import React from 'react';
import { JsonNodeModel } from './JsonModel';
import { JsonNodeWidget } from './JsonWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class JsonNodeFactory extends AbstractReactFactory<JsonNodeModel, DiagramEngine> {
	constructor() {
		super('Json');
	}

	generateModel(initialConfig: any) {
		return new JsonNodeModel();
	}

	generateReactWidget(event: any): JSX.Element {
		return <JsonNodeWidget engine={this.engine as DiagramEngine} model={event.model} />;
	}
}

export default JsonNodeFactory;
