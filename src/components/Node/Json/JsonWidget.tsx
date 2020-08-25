import React, { Component } from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { JsonNodeModel } from './JsonModel';

import * as _ from 'lodash';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import styled from '@emotion/styled';

export interface JsonNodeWidgetProps {
	model: JsonNodeModel;
	engine: DiagramEngine;
}

export interface JsonNodeWidgetState {}

export const Node = styled.div<{ background: string; selected: boolean }>`
background-color: ${(p) => p.background};
border-radius: 5px;
font-family: sans-serif;
color: white;
border: solid 2px black;
overflow: visible;
font-size: 11px;
border: solid 2px ${(p) => (p.selected ? 'rgb(0,192,255)' : 'black')};
`;

export const Title = styled.div`
background: rgba(0, 0, 0, 0.3);
display: flex;
white-space: nowrap;
justify-items: center;
`;

export const TitleName = styled.div`
flex-grow: 1;
padding: 5px 5px;
`;

export const Ports = styled.div`
display: flex;
background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
`;

export const PortsContainer = styled.div`
flex-grow: 1;
display: flex;
flex-direction: column;

&:first-of-type {
	margin-right: 10px;
}

&:only-child {
	margin-right: 0px;
}
`;

export class JsonNodeWidget extends Component<JsonNodeWidgetProps, JsonNodeWidgetState> {
	constructor(props: JsonNodeWidgetProps) {
		super(props);
		this.state = {};
	}

	generatePort = (port: any) => {
		return <DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />;
	};

	render() {
		return (
			<Node
				data-default-node-name={this.props.model.getOptions().name}
				selected={this.props.model.isSelected()}
				background={this.props.model.getOptions().color}>
				<Title>
					<TitleName>{this.props.model.getOptions().name}</TitleName>
				</Title>
				<Ports>
					<PortsContainer>{_.map(this.props.model.getInputPorts(), this.generatePort)}</PortsContainer>
					<PortsContainer>{_.map(this.props.model.getOutputPorts(), this.generatePort)}</PortsContainer>
				</Ports>
			</Node>
		);
	}

	// render() {
	// 	return (
	// 		<div className="custom-node">
	// 			<PortWidget engine={this.props.engine} port={this.props.model.getPort('in')}>
	// 				<div className="circle-port" />
	// 			</PortWidget>
	// 			<PortWidget engine={this.props.engine} port={this.props.model.getPort('out')}>
	// 				<div className="circle-port" />
	// 			</PortWidget>
	// 			<div className="custom-node-color" style={{ backgroundColor: this.props.model.color }} />
	// 		</div>
	// 	);
	// }
}
