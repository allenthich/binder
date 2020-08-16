import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Resizable } from 're-resizable';

export interface ResizableSideBarProps {
  /**
   * Any nested children elements
   */
  children?: any
  /**
   * Whether to enable vertical resizing
   */
  enableVertical?: boolean;
  /**
   * Whether to enable horizontal resizing
   */
  enableHorizontal?: boolean;
  /**
   * Whether to enable corner resizing
   */
  enableCorners?: boolean;
}

export function ResizableSideBar (props: ResizableSideBarProps) {
  let enableVertical = props.enableVertical || false
  let enableHorizontal = props.enableHorizontal || false
  let enableCorners = props.enableCorners || false

  const useStyles = makeStyles({
    root: {
      border: '1px solid black;',
    },
  });
  const classes = useStyles();

  let permissions = {
    top:          enableVertical,
    right:        enableHorizontal,
    bottom:       enableVertical,
    left:         enableHorizontal,
    topRight:     enableCorners,
    bottomRight:  enableCorners,
    bottomLeft:   enableCorners,
    topLeft:      enableCorners,
  }

  return (
    <Resizable
      className={classes.root}
      defaultSize={{
        width:320,
        height:200,
      }}
      enable={permissions}
    >
      {props.children}
    </Resizable>
  )
}
