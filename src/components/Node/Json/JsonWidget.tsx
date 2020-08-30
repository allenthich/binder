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
	background: rgba(0, 0, 0, 0.5);
	padding: 0 1em;
	display: flex;
	white-space: nowrap;
	justify-items: center;
`;

export const TitleName = styled.div`
flex-grow: 1;
padding: 5px 5px;
`;
export const SubTitle = styled.div`
	background: rgba(0, 0, 0, 0.5);
	padding: 0 1em;
	display: flex;
	white-space: nowrap;
	justify-items: center;
`;

export const SubTitleName = styled.div`
flex-grow: 1;
padding: 5px 5px;
`;

export const DataContent = styled.div`
	display: flex;
	padding: 0 2em;
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
		return (
			<DataItem
				type={dataType}
				name="keyName" 
				data={data}
			/>
		)
	}

	createNodeElementsFromData = () => {
		const exampleData =	{
			"id": "1",
			"value": "big potato"
		}
		const exampleData1 = [
			{
				"id": "1",
				"value": "big potato"
			}, {
				"id": "2",
				"value": "little potato"
			}
		]
		const exampleData2 = {
			"nested": {
				"nested1": [
					"abc",
					"def"
				]
			},
			"id": "internal",
			"nested2": {
				"id": "2",
				"value": "little potato",
				"neste2": {
					"tested": "woo"
				}
			},
			"testing1": "data",
			"testing2": "data",
			"testing3": "data",
			"testing4": "data",
			"testing5": "data",
			"testing6": "data",
			"testing7": "data",
			"testing8": "data",
			"testing9": "data",
			"testing10": "data",
			"testing11": "data",
			"testing12": "data",
			"testing13": "data",
			"testing14": "data",
			"testing15": "data",
			"testing16": "data",
			"testing17": "data",
			"testing18": "data",
			"testing19": "data",
			"testing20": "data",
			"testing21": "data",
			"testing22": "data"
		}
		const exampleData3 = {
			"nested": {
				"nested2": [
					"abc",
					"def"
				]
			},
		}
		// This causes max recursion stack due to duplicate nested keys
		const exampleData5 = {
			"nested": {
				"nested": [
					"abc",
					"def"
				]
			},
		}
		// Traverse data and create DataItems
		return this.generateDataItem(exampleData2);
	}

	render() {
		const nodeType = this.props.model.getOptions().dataType
		return (
			<Node
				data-default-node-name={this.props.model.getOptions().name}
				selected={this.props.model.isSelected()}
				background={this.props.model.getOptions().color}>
				<Title>
					<TitleName>{this.props.model.getOptions().name}</TitleName>
				</Title>
				{ nodeType
					&& <SubTitle>
						<SubTitleName>{nodeType}</SubTitleName>
					</SubTitle>
				}
				
				<DataContent>
					{this.createNodeElementsFromData()}
					{/* {props.port.isInput()} */}
					{/* <PortsContainer className='portsContainer'>{_.map(this.props.model.getInputPorts(), this.generatePort)}</PortsContainer> */}
					{/* <PortsContainer className='portsContainer'>{_.map(this.props.model.getOutputPorts(), this.generatePort)}</PortsContainer> */}
				</DataContent>
			</Node>
		);
	}
}
