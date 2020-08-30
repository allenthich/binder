import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import _ from 'lodash';

interface RenderTree {
  id: string;
  name: string;
  children?: RenderTree[];
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export const RecursiveTreeView = memo((props: any) => {
  const classes = useStyles();

  const renderTree = (value: any, indexKey: string) => {
    // Base case
    if (typeof value === 'string') {
      return (
        <TreeItem nodeId={String(indexKey)} label={`${indexKey}: ${value}`} />
      )
    } else {
      // Recur if object or array
      return (
        <TreeItem key={String(indexKey)} nodeId={String(indexKey)} label={String(indexKey)}>
          {_.isObjectLike(value) && _.map(value, renderTree)}
        </TreeItem>
      );
    }
  }

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {_.map(props.data, renderTree)}
    </TreeView>
  );
});
