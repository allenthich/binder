import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import BaseModel from '../../../core/BaseModel';
import PortModel from '../../../core/Port/PortModel';

export interface JsonNodeModelOptions extends BaseModelOptions {
	color?: string;
}

export class JsonNodeModel extends BaseModel {
	color: string;

	constructor(options: JsonNodeModelOptions = {}) {
		super({
			...options,
			type: 'Json'
		}, {});
		this.color = options.color || 'red';

		// setup an in and out port
		this.addInputPort(
			new PortModel({
				in: true,
				name: 'in'
			})
		);
		this.addOutputPort(
			new PortModel({
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

export default JsonNodeModel;
