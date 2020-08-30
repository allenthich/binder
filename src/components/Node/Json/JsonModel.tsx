import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { BaseModel } from '../../../core/BaseModel';
import { PortModel} from '../../../core/Port/PortModel';

import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface DefaultNodeModelOptions extends BasePositionModelOptions {
	name?: string;
	color?: string;
}

export interface JsonNodeModelOptions extends BaseModelOptions {
	color?: string;
}

export class JsonNodeModel extends BaseModel {
	color: string;

	constructor(name: string, color: string);
	constructor(options?: DefaultNodeModelOptions);
	constructor(options: any = {}, color?: string) {
		if (typeof options === 'string') {
			options = {
				name: options,
				color: color
			};
		}
		super({
			type: 'default',
			name: 'Untitled',
			color: 'rgb(0,0,0,0.25)',
			...options
		});
		this.addInputPort('in');
		this.addOutputPort('out');
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
