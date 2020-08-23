import React from 'react';
import { JsonNodeModel } from './Model';
import { JsonNodeWidget } from './Widget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class JsonNodeFactory extends AbstractReactFactory<JsonNodeModel, DiagramEngine> {
	constructor() {
		super('Json');
	}

	generateModel(initialConfig: any) {
		return new JsonNodeModel(initialConfig);
	}

	generateReactWidget(event: any): JSX.Element {
		return <JsonNodeWidget engine={this.engine as DiagramEngine} node={event.model} />;
	}
}

export default JsonNodeFactory;
