/**
 * @file DataItem.tsx
 * A data item acts as a container for an Node's individual input or output
 */
import * as React from 'react';
import * as _ from 'lodash';
import styled from '@emotion/styled';
import { TextInput } from './InputItem';
import { Accordion } from './Accordion';

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


export const DataItem = (props: NodeElementDataItemProps) => {
  const generateDataComponent = (value: any, indexKey?: string | number) => {
    const dataType = typeof value

    // Base case: string/number
    if (dataType === "string" || dataType === "number") {
      return <TextInput data={value} key={indexKey} />
		} else if (Array.isArray(value) || dataType === "object") {
      return (
        <Accordion type={dataType}>
          {/* This should be creating accordion items */}
          {_.map(value, generateDataComponent)}
        </Accordion>
      )
		}
  }

  return (
    <DataItemContainer>
      {generateDataComponent(props.data)}
    </DataItemContainer>
  );
}