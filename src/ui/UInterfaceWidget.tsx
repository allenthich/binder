import * as React from 'react';
// import styled from '@emotion/styled';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

export interface DefaultProps {
	children: string
}

export interface UiWidgetProps {
	buttons?: any;
}

export namespace UInterface {
	const topMenuSectionStyles = makeStyles({
		root: {
			border: '1px solid black;',
			width: '100%',
		},
	});

	const topMenuBarStyles = makeStyles({
		root: {
			border: '1px solid black;',
			width: '100%',
		},
	});
	
	export const TopMenuBar = () => {
		const menuBarStyles = topMenuBarStyles();
		const menuSectionStyles = topMenuSectionStyles();
		return <Grid
			container
			direction="row"
			justify="space-between"
			alignItems="stretch"
			className={menuBarStyles.root}
		>
			<Grid item spacing={0} sm={4} className={menuSectionStyles.root}>1</Grid>
			<Grid item spacing={0} sm={4} className={menuSectionStyles.root}>2</Grid>
			<Grid item spacing={0} sm={4} className={menuSectionStyles.root}>3</Grid>
		</Grid>;
	}

	// export const Toolbar = styled.div`
	// 	padding: 5px;
	// 	display: flex;
	// 	flex-shrink: 0;
	// `;

	// export const Content = styled.div`
	// 	flex-grow: 1;
	// 	height: 100%;
	// `;

	// export const Container = styled.div`
	// 	background: black;
	// 	display: flex;
	// 	flex-direction: column;
	// 	height: 100%;
	// 	border-radius: 5px;
	// 	overflow: hidden;
	// `;
}

// export const Button = styled.button`
// 	background: rgb(60, 60, 60);
// 	font-size: 14px;
// 	padding: 5px 10px;
// 	border: none;
// 	color: white;
// 	outline: none;
// 	cursor: pointer;
// 	margin: 2px;
// 	border-radius: 3px;
// 	&:hover {
// 		background: rgb(0, 192, 255);
// 	}
// `;

export class UiWidget extends React.Component<UiWidgetProps> {
	render() {
		return (
			<Box>
				<UInterface.TopMenuBar />
			</Box>
			// <UInterface.Container>
			// 	<UInterface.Toolbar>{this.props.buttons}</UInterface.Toolbar>
			// 	<UInterface.Content>{this.props.children}</UInterface.Content>
			// </UInterface.Container>
		);
	}
}