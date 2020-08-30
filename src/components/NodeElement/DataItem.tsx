/**
 * @file DataItem.tsx
 * A data item acts as a container for an Node's individual input or output
 */
import * as React from 'react';
import * as _ from 'lodash';
import styled from '@emotion/styled';
import { RecursiveTreeView } from './TreeView';
import { memo } from 'react';

type JsonData = string | number | Array<any> | Object;

export interface NodeElementDataItemProps {
  name: String;
  type: JsonData;
  data: JsonData;
}

export const DataItemContainer = styled.div`
  display: flex;
  margin-top: 1px;
  align-items: center;
`;

export const Label = styled.div`
  padding: 0 5px;
  flex-grow: 1;
`;


export const DataItem = memo((props: NodeElementDataItemProps) => {
  return (
    <DataItemContainer>
      <RecursiveTreeView data={props.data} />
    </DataItemContainer>
  );
})