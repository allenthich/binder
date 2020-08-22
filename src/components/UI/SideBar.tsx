import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ResizableProps, Resizable, ResizeDirection  } from 're-resizable';

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
  /**
   * Side bar dimensions
   */
  size?: {
    width: string | number;
    height: string | number;
  }
}

export function ResizableSideBar (props: ResizableSideBarProps) {
  const { verticalResizing, horizontalResizing, cornerResizing, size, ...resizableProps } = { ...props }
  resizableProps.enable = resizableProps.enable || {}

  let targetRef = useRef<Resizable>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [sizing, setSize] = useState(size);

  const useStyles = makeStyles({
    root: {
      border: '1px solid black;',
    },
  });
  const classes = useStyles();

  const permissions = {
    top:          resizableProps.enable.top || verticalResizing || false,
    right:        resizableProps.enable.right || horizontalResizing || false,
    bottom:       resizableProps.enable.bottom || verticalResizing || false,
    left:         resizableProps.enable.left || horizontalResizing || false,
    topRight:     resizableProps.enable.topRight || cornerResizing || false,
    bottomRight:  resizableProps.enable.bottomRight || cornerResizing || false,
    bottomLeft:   resizableProps.enable.bottomLeft || cornerResizing || false,
    topLeft:      resizableProps.enable.topLeft || cornerResizing || false,
  }

  /**
   * Check for initial collapse based on sidebar width 
   */
  const checkForCollapse = (
    event: MouseEvent | TouchEvent,
    direction: ResizeDirection ,
    refToElement: HTMLElement,
    delta: {
      width: number;
      height: number;
    }
  ) => {
    console.log(refToElement.offsetWidth)
    const elWidth = refToElement.offsetWidth
    const belowMinWidth = elWidth <= 70
    // Toggle collapsed
    if ((belowMinWidth && !collapsed) || (!belowMinWidth && collapsed)) {
      setCollapsed(!collapsed)
    }

    let newWidth = elWidth
    // Check for intentional uncollapse
    if (belowMinWidth) {
      newWidth = 2
    } else if (elWidth > 70 && elWidth < 140) {
      newWidth = 140
    }
    targetRef.current.updateSize({
      width: newWidth,
      height: 'auto',
    })
  }

  /**
   * Set sidebar width based on whether it is collapsed
   */
  const setFinalWidth = (
    event: MouseEvent | TouchEvent,
    direction: ResizeDirection ,
    refToElement: HTMLElement,
    delta: {
      width: number;
      height: number;
    }) => {
    setSize({
      width: collapsed ? 2 : refToElement.style.width,
      height: 'auto',
    });
  }

  return (
    <Resizable
      {...resizableProps}
      size={sizing}
      className={`${classes.root} ${props.className}`}
      enable={permissions}
      onResize={checkForCollapse}
      onResizeStop={setFinalWidth}
      ref={targetRef}
    >
      {!collapsed && props.children}
    </Resizable>
  )
}
