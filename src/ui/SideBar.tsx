import React, { useRef, useState, useEffect } from 'react';
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
}

export function ResizableSideBar (props: ResizableSideBarProps) {
  const { verticalResizing, horizontalResizing, cornerResizing, ...resizableProps } = { ...props }
  resizableProps.enable = resizableProps.enable || {}

  let targetRef = useRef<Resizable>(null);
  const [display, setDisplay] = useState('none');
  const [collapsed, setCollapsed] = useState(false);

  // useEffect(() => {
  //   // Hide children
  //   if (collapsed) {
  //     targetRef.current.updateSize({
  //       width: '1%',
  //       height: 'auto',
  //     })
  //   } else {
  //     targetRef.current.updateSize({
  //       width: '50%',
  //       height: 'auto',
  //     })

  //   }
  //   // console.log('useEffect',targetRef.current )
  //   // if (width < ) {
  //   //   // Hide children if width is under threshold
  //   //   setDisplay()
  //   // }
  // }, [collapsed]);

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

  const checkForCollapse = (
    event: MouseEvent | TouchEvent,
    direction: ResizeDirection ,
    refToElement: HTMLElement,
    delta: {
      width: number;
      height: number;
    }
  ) => {
    console.log(refToElement.style.width)
    const belowMinWidth = parseFloat(refToElement.style.width) <= 5
    if ((belowMinWidth && !collapsed)
      || (!belowMinWidth && collapsed)
    ) {
      // Toggle collapsed
      setCollapsed(!collapsed)
      // Hide children
      // if (collapsed) {
      //   targetRef.current.updateSize({
      //     width: '1%',
      //     height: 'auto',
      //   })
      // } else {
      //   targetRef.current.updateSize({
      //     width: '50%',
      //     height: 'auto',
      //   })

      // }
    }
  }

  return (
    <Resizable
      {...resizableProps}
      className={`${classes.root} ${props.className}`}
      enable={permissions}
      onResize={checkForCollapse}
      ref={targetRef}
    >
      {!collapsed && props.children}
    </Resizable>
  )
}
