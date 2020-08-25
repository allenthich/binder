import { Point } from '@projectstorm/geometry';
import { NodeModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';

import { PortModel } from './Port/PortModel';

const getPort = (port: any) => {
  if (port instanceof PortModel) return port;
  return new PortModel({ name: port });
};

export interface BaseOptions extends BaseModelOptions {
  name?: string;
  color?: string;
}

export class BaseModel extends NodeModel {
  configurations: any;
  constructor(options: BaseOptions = {}, configurations: any = {}) {
    super(options);

    this.initialize();

    this.configurations = configurations;
  }

  serialize() {
    return {
      ...super.serialize(),
      configurations: this.configurations,
    };
  }

  addInputPort(arg: any, bits = 1) {
    const port = getPort(arg);
    port.setAsInput();
    if (typeof arg === 'string') port.setBits(bits);
    super.addPort(port);
  }

  addOutputPort(arg: any, bits = 1) {
    const port = getPort(arg);
    port.setAsOutput();
    if (typeof arg === 'string') port.setBits(bits);
    super.addPort(port);
  }

  addPort(arg: any) : PortModel {
    // removed from arg
    let bits = 1
    const port = getPort(arg);

    if (port.isInput()) {
      this.addInputPort(port, bits);
      return;
    }

    if (port.isOutput()) {
      this.addOutputPort(port, bits);
      return;
    }

    throw new Error(
      '[logossim] Use either `addInputPort` or `addOutputPort`',
    );
  }

  removePort(arg: any) {
    const port = getPort(arg);
    super.removePort(port);
  }

  getInputPorts() {
    return Object.fromEntries(
      Object.entries(this.getPorts()).filter(([, port]) =>
        port.isInput(),
      ),
    );
  }

  getOutputPorts() {
    return Object.fromEntries(
      Object.entries(this.getPorts()).filter(
        ([, port]) => !port.isInput(),
      ),
    );
  }

  getAllLinks() {
    return Object.values(this.getPorts())
      .map(port => port.getMainLink())
      .filter(link => !!link)
      .reduce(
        (arr, link) => [...arr, link, ...link.getAllBifurcations()],
        [],
      );
  }

  clone(...args) {
    const clone = super.clone(...args);
    clone.setPosition(new Point(this.getX() + 15, this.getY() + 15));
    return clone;
  }

  initialize() {}

  onSimulationStart() {}

  onSimulationPause() {}

  onSimulationStop() {}

  step() {}

  getOptions() : BaseOptions {
    return this.options;
  }
}