/**
 * @file Port.tsx
 * This Port UI component acts as the input or output visual of a port
 */
import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { PortModel } from './PortModel';
import styled from '@emotion/styled';
import { LinkModel, LinkModelGenerics } from '@projectstorm/react-diagrams';

export interface DefaultPortLabelProps {
	port: PortModel;
	engine: DiagramEngine;
}

export interface CirclePortProps {
	port: PortModel;
	link: LinkModel<LinkModelGenerics>;
}

export const Port = (props: DefaultPortLabelProps) => {
	const PortContainer = styled.div`
		width: 10px;
		height: 10px;
		border: var(--port-width) solid
			${(props: CirclePortProps) =>
				props.link
					? 'var(--port-connected-border)'
					: 'var(--port-unconnected-border)'};
		border-radius: 100%;
		background: ${(props: CirclePortProps) => props.port.getColor()};
		&:hover {
			background: var(--port-hover);
		}
	`;
	return (
		<PortWidget engine={props.engine} port={props.port}>
			<PortContainer link={props.port.getMainLink()} port={props.port}/>
		</PortWidget>
	);
}