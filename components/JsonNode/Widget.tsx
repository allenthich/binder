import React, { Component } from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { JsonNodeModel } from './Model';

export interface JsonNodeWidgetProps {
	node: JsonNodeModel;
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
				<PortWidget engine={this.props.engine} port={this.props.node.getPort('in')}>
					<div className="circle-port" />
				</PortWidget>
				<PortWidget engine={this.props.engine} port={this.props.node.getPort('out')}>
					<div className="circle-port" />
				</PortWidget>
				<div className="custom-node-color" style={{ backgroundColor: this.props.node.color }} />
			</div>
		);
	}
}
