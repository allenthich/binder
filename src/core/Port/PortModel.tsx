import { PortModel as RDPortModel } from '@projectstorm/react-diagrams';

// import LinkModel from '../Link/LinkModel';

export default class PortModel extends RDPortModel {
  value: any;
  input: any;
  bits : any;

  constructor(options = {}) {
    super({
      name: 'TODO PORTNAME SET',
      type: 'Port',
      maximumLinks: 1,
      ...options,
    });

    this.value = null;
    this.input = null;
    this.bits = null;
  }

  serialize() {
    return {
      ...super.serialize(),
      input: this.input,
      value: this.value,
      bits: this.bits,
    };
  }

  deserialize(event: any) {
    super.deserialize(event);
    this.value = event.data.value;
    this.input = event.data.input;
    this.bits = event.data.bits;
  }

  setAsInput() {
    this.input = true;
  }

  setAsOutput() {
    this.input = false;
  }

  isInput() {
    return this.input === true;
  }

  isOutput() {
    return this.input === false;
  }

  getBits() {
    return this.bits;
  }

  setBits(bits: any) {
    if (![1, 2, 4, 8, 16].includes(bits))
      throw new Error(
        '[logossim] Number of bits should be one of: 1, 2, 4, 8 or 16',
      );

    this.bits = bits;
  }

  getValue() {
    return this.value;
  }

  setValue(value: any) {
    this.value = value;
  }

  isNewLinkAllowed() {
    return (
      Object.keys(this.getLinks()).length < this.getMaximumLinks()
    );
  }

  canLinkToPort(port: any) {
    return port.isNewLinkAllowed() && this.getID() !== port.getID();
  }

  // createLinkModel() {
  //   if (this.isNewLinkAllowed()) {
  //     const link = new LinkModel();
  //     link.setBits(this.bits);
  //     return link;
  //   }
  //   return null;
  // }

  getMainLink() {
    const links = Object.values(this.getLinks());
    return links.length > 0 ? links[0] : null;
  }

  getColor() {
    const link = this.getMainLink();
    // if (link) return link.getColor();

    return 'var(--port-unconnected)';
  }
}