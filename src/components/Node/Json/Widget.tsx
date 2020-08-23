import React, { Component } from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { JsonNodeModel } from './Model';

export interface JsonNodeWidgetProps {
	model: JsonNodeModel;
	engine: DiagramEngine;
}

export interface JsonNodeWidgetState {}

export class JsonNodeWidget extends Component<JsonNodeWidgetProps, JsonNodeWidgetState> {
	constructor(props: JsonNodeWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="custom-node">
				<PortWidget engine={this.props.engine} port={this.props.model.getPort('in')}>
					<div className="circle-port" />
				</PortWidget>
				<PortWidget engine={this.props.engine} port={this.props.model.getPort('out')}>
					<div className="circle-port" />
				</PortWidget>
				<div className="custom-node-color" style={{ backgroundColor: this.props.model.color }} />
			</div>
		);
	}
}

export default JsonNodeWidget;
