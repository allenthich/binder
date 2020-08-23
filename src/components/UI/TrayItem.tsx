import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export interface TrayItemProps {
	model: any;
	color?: string;
	name: string;
	background?: string;
}

export const TrayItem = (props: TrayItemProps) => {
  const useStyles = makeStyles({
    // Style rule
    root: (p: { color: string; background: string; }) => ({
      backgroundColor: p.background,
      padding: '5px',
      margin: '10px',
      border: `solid 1px ${(p: TrayItemProps) => p.color}`,
      marginBottom: '2px',
      cursor: 'pointer'
    }),
  });
  
  const classes = useStyles({
    color: 'rgba(255,255,255, 0.05)',
    background: '',
  });

  return (
    <Paper
      elevation={2}
      color={props.color}
      draggable={true}
      onDragStart={(event) => {
        const data = JSON.stringify(props.model.serialize());
        event.dataTransfer.setData('storm-diagram-node', data);
      }}
      className={classes.root}>
        {props.name}
    </Paper>
  );
}