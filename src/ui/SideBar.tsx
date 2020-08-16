import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ResizableProps, Resizable } from 're-resizable';

export interface ResizableSideBarProps extends ResizableProps {
  /**
   * Any nested children elements
   */
  children?: any
  /**
   * Whether to enable vertical resizing
   */
  verticalResizing?: boolean;
  /**
   * Whether to enable horizontal resizing
   */
  horizontalResizing?: boolean;
  /**
   * Whether to enable corner resizing
   */
  cornerResizing?: boolean;
}

export function ResizableSideBar (props: ResizableSideBarProps) {
  const { verticalResizing, horizontalResizing, cornerResizing, ...resizableProps } = { ...props }

  const useStyles = makeStyles({
    root: {
      border: '1px solid black;',
    },
  });
  const classes = useStyles();

  const permissions = {
    top:          verticalResizing || false,
    right:        horizontalResizing || false,
    bottom:       verticalResizing || false,
    left:         horizontalResizing || false,
    topRight:     cornerResizing || false,
    bottomRight:  cornerResizing || false,
    bottomLeft:   cornerResizing || false,
    topLeft:      cornerResizing || false,
  }

  return (
    <Resizable
      {...resizableProps}
      className={classes.root}
      enable={permissions}
    >
      {props.children}
    </Resizable>
  )
}
