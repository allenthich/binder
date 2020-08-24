import React from 'react';
import { MenuProvider } from 'react-contexify';

import { AbstractReactFactory } from '@projectstorm/react-canvas-core';

export default class Component extends AbstractReactFactory {
  name: any
  description: any
  group: any
  configurations: any
  Model: any
  Widget: any
  Icon: any
  constructor({
    type,
    name,
    description,
    group,
    configurations = [],
    model,
    widget,
    icon,
  }: {
    type?: string,
    name?: string,
    description?: string,
    group?: any,
    configurations?: any,
    model?: any,
    widget?: any,
    icon?: any,
  }) {
    super(type);
    this.name = name;
    this.description = description;
    this.group = group;
    this.configurations = configurations;
    this.Model = model;
    this.Widget = widget;
    this.Icon = icon;
  }

  generateReactWidget(event: any) {
    const { Widget } = this;
    const { model } = event;

    return (
      <MenuProvider id="component" storeRef={false} data={model}>
        <Widget engine={this.engine} model={model} />
      </MenuProvider>
    );
  }

  generateModel(event: any) {
    const { Model } = this;
    const { type, configurations } = event.initialConfig;

    return new Model(type, configurations);
  }
}