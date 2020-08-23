import { DiagramEngine, NodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';

export interface JsonNodeModelOptions extends BaseModelOptions {
	color?: string;
}

export class JsonNodeModel extends NodeModel {
	color: string;

	constructor(options: JsonNodeModelOptions = {}) {
		super({
			...options,
			type: 'json-custom-node'
		});
		this.color = options.color || 'red';

		// setup an in and out port
		this.addPort(
			new DefaultPortModel({
				in: true,
				name: 'in'
			})
		);
		this.addPort(
			new DefaultPortModel({
				in: false,
				name: 'out'
			})
		);
	}

	serialize() {
		return {
			...super.serialize(),
			color: this.color
		};
	}

	deserialize(ob: any): void {
		super.deserialize(ob);
		this.color = ob.color;
	}
}
