import React, { Component } from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { JsonNodeModel } from './JsonModel';

import * as _ from 'lodash';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import styled from '@emotion/styled';
import { Port } from '../../../core/Port/Port';
import { DataItem } from '../../NodeElement/DataItem';

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

export const DataContent = styled.div`
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

	// Notes: Given a JSON data object, create a widget corresponding to the data

	generatePort = (port: any) => {
		return <Port engine={this.props.engine} port={port} key={port.getID()} />;
	};

	generateDataItem = (data: String | Number | Object | Array<any>) : any => {
		const dataType = Array.isArray(data) ? "array" : typeof data
		//  Base case
		// if (dataType === "string" || dataType === "number") {
		return (
			<DataItem
				type={dataType}
				name="keyName" 
				data={data}
			/>
		)
		// } else if (dataType === "array" || dataType === "object") {
		// 	// Recur with subset of data
		// 	// Iterate with array
		// 	// Entry for object
			
		// 	return this.generateDataItem(data)
		// }

	}

	createNodeElementsFromData = () => {
		const exampleData = [
			{
				"id": "1",
				"value": "big potato"
			}, {
				"id": "2",
				"value": "little potato"
			}
		]
		// Traverse data and create DataItems
		return this.generateDataItem(exampleData);
	}

	render() {
		return (
			<Node
				data-default-node-name={this.props.model.getOptions().name}
				selected={this.props.model.isSelected()}
				background={this.props.model.getOptions().color}>
				<Title>
					<TitleName>{this.props.model.getOptions().name}</TitleName>
				</Title>
				
				<DataContent>
					{this.createNodeElementsFromData()}
					{/* {props.port.isInput()} */}
					{/* <PortsContainer className='portsContainer'>{_.map(this.props.model.getInputPorts(), this.generatePort)}</PortsContainer> */}
					{/* <PortsContainer className='portsContainer'>{_.map(this.props.model.getOutputPorts(), this.generatePort)}</PortsContainer> */}
				</DataContent>
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
