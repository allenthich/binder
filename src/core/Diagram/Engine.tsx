import { Point } from '@projectstorm/geometry';
import createEngine, {
  DiagramModel, NodeModel,
  DefaultNodeModel
} from '@projectstorm/react-diagrams';

// import BaseModel from '../BaseModel';
// import LinkFactory from '../Link/LinkFactory';
// import PortFactory from '../Port/PortFactory';
// import ClipboardAction from './actions/ClipboardAction';
// import DeleteAction from './actions/DeleteAction';
// import DuplicateAction from './actions/DuplicateAction';
// import UndoRedoAction from './actions/UndoRedoAction';
// import ZoomAction from './actions/ZoomAction';
// import commandHandlers from './Command/commandHandlers';
// import CommandManager from './Command/CommandManager';
// import States from './states/States';

import JsonNodeFactory from '../../components/Node/Json/JsonFactory';

export default class DiagramEngine {
  components?: Array<any>;
  areShortcutsAllowed?: any;
  showSnackbar?: any;
  locked: boolean;
  engine: any;
  model: any;

  constructor(components = [], areShortcutsAllowed = false, showSnackbar = false) {
    this.components = components;
    this.areShortcutsAllowed = areShortcutsAllowed;
    this.showSnackbar = showSnackbar;
    this.locked = false;

    this.initializeEngine();
    this.initializeModel();
    this.addDefaultNodes();
  }

  getEngine = () => this.engine;

  getModel = () => this.engine.getModel();

  /**
   * Initialization methods
   */
  initializeEngine = () => {
    this.engine = createEngine({
      registerDefaultDeleteItemsAction: false,
      registerDefaultZoomCanvasAction: false,
    });

    // this.engine.commands = new CommandManager();
    // this.engine.registerListener(commandHandlers(this));

    // this.engine
    //   .getStateMachine()
    //   .pushState(new States(this.showSnackbar));

    // const actions = [
    //   DuplicateAction,
    //   ClipboardAction,
    //   DeleteAction,
    //   UndoRedoAction,
    //   ZoomAction,
    // ];
    // actions.forEach(Action =>
    //   this.engine
    //     .getActionEventBus()
    //     .registerAction(new Action(this.areShortcutsAllowed)),
    // );

    // this.engine.getPortFactories().registerFactory(new PortFactory());
    // this.engine.getLinkFactories().registerFactory(new LinkFactory());
    this.engine.getNodeFactories().registerFactory(new JsonNodeFactory() as any);
    this.engine.getNodeFactories().registerFactory(new JsonNodeFactory());

    this.registerComponents();
  };

  initializeModel = () => {
    this.model = new DiagramModel();

    this.model.setGridSize(15);
    this.model.setLocked(false);
    this.model.registerListener({
      eventDidFire: (event: any) => {
        const type = event.function;
        if (type === 'offsetUpdated') this.adjustGridOffset(event);
        if (type === 'zoomUpdated') this.adjustGridZoom(event);
      },
    });
    this.realignGrid();

    this.engine.setModel(this.model);
  };

  addDefaultNodes = () => {
    //3-A) create a default node
    var node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
    let port = node1.addOutPort('Out');
    node1.setPosition(100, 100);

    //3-B) create another default node
    var node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
    let port2 = node2.addInPort('In');
    node2.setPosition(400, 100);

    // link the ports
    let link1 = port.link(port2);

    //4) add the models to the root graph
    this.model.addAll(node1, node2, link1);
  }

  registerComponents = () => {
    this.components.forEach(component => {
      this.engine.getNodeFactories().registerFactory(component);
    });
  };

  /**
   * Serializing & deserializing methods
   */
  serialize = () => this.model.serialize();

  load = (circuit: any) => {
    this.engine.commands.clear();
    this.model.deserializeModel(circuit, this.engine);
    this.realignGrid();
    this.engine.repaintCanvas();
  };

  /**
   * Diagram locking methods
   */
  setLocked = (locked: any) => {
    this.model.setLocked(locked);
    this.locked = locked;
  };

  isLocked = () => this.locked;

  /**
   * Diagram painting methods
   */
  repaint = () => this.engine.repaintCanvas();

  realignGrid = () => {
    this.adjustGridOffset({
      offsetX: this.model.getOffsetX(),
      offsetY: this.model.getOffsetY(),
    });

    this.adjustGridZoom({
      zoom: this.model.getZoomLevel(),
    });
  };

  adjustGridOffset = ({ offsetX, offsetY }: { offsetX: number, offsetY: number }) => {
    const canvasElement = document.getElementById('canvasWrapper')
    if (canvasElement) {
      canvasElement.style.setProperty('--offset-x', `${offsetX}px`);
      canvasElement.style.setProperty('--offset-y', `${offsetY}px`);
    }
  };

  adjustGridZoom = ({ zoom }: { zoom: number }) => {
    const { gridSize } = this.model.getOptions();
    const canvasElement = document.getElementById('canvasWrapper')
    if (canvasElement) {
      canvasElement.style.setProperty(
        '--grid-size',
        `${(gridSize * zoom) / 100}px`,
      );
    }
  };

  /**
   * Component creation and configuration methods
   */
  handleComponentDrop = (event: any, component: any) => {
    // Detect Component model
    const { Model } = this.components.find(
      c => c.type === component.type,
    );

    // const Model = comp.generateModel();

    const getSnappedRelativeMousePoint = (event: any) => {
      const { x, y } = this.engine.getRelativeMousePoint(event);
      return new Point(
        Math.round(x / 15) * 15,
        Math.round(y / 15) * 15,
      );
    };

    const point = event
      ? getSnappedRelativeMousePoint(event)
      : new Point(0, 0);

    const node = new Model(component.type, component.configurations);
    // const node = new DefaultNodeModel(component.type, component.color);
    // const node = comp.generateModel();
    this.model.addNode(node);
    node.setPosition(point);

    this.engine.fireEvent({ nodes: [node] }, 'componentsAdded');

    this.engine.repaintCanvas();
  };

  handleComponentEdit = (node: any, configurations: any) => {
    const configurationsBefore = node.configurations;
    const linksBefore = node.getAllLinks();

    this.editComponentConfiguration(node, configurations);

    this.engine.fireEvent(
      {
        node,
        configurations: {
          before: configurationsBefore,
          after: node.configurations,
        },
        links: {
          before: linksBefore,
          after: node.getAllLinks(),
        },
      },
      'componentEdited',
    );

    this.engine.repaintCanvas();
  };

  /**
   * When the component configuration is changed, we reinitialize the
   * given component with the given configurations.
   *
   * For simplicity's sake, if this configuration edit creates or
   * removes a port, we delete all its links. Also, if the number of
   * bits of a port is changed, its main link is deleted.
   */
  editComponentConfiguration = (node: any, configurations: any) => {
    // const portsBefore = node.getPorts();

    // // Resets configurations and ports for the node and reinitialize
    // node.configurations = configurations; // eslint-disable-line no-param-reassign
    // node.ports = {}; // eslint-disable-line no-param-reassign
    // node.initialize(configurations);

    // const hasNewPort = Object.values(node.getPorts()).some(
    //   (newPort: nodeModel) => !portsBefore[newPort.getName()],
    // );
    // const hasRemovedPort = Object.values(portsBefore).some(
    //   (oldPort: nodeModel) => !node.getPort(oldPort.getName()),
    // );

    // if (hasNewPort || hasRemovedPort) {
    //   /**
    //    * If there was any port added or removed, we need to remove all
    //    * links connected to the edited component.
    //    */
    //   Object.values(portsBefore).forEach(port =>
    //     Object.values(port.getLinks()).forEach(link => link.remove()),
    //   );
    //   return;
    // }

    /**
     * If no port was neither added or removed, we need to map old
     * port links to new ports
     */
    // Object.values(portsBefore).forEach(portBefore => {
    //   const newPort = node.getPort(portBefore.getName());
    //   /**
    //    * If the number of bits for this port has changed, delete its
    //    * main link, to avoid inconsistencies.
    //    */
    //   if (portBefore.getBits() !== newPort.getBits()) {
    //     if (portBefore.getMainLink())
    //       portBefore.getMainLink().remove();
    //     return;
    //   }

    //   const link = Object.values(portBefore.getLinks())[0];
    //   if (!link) return;
    //   newPort.addLink(link);
    //   if (portBefore === link.getSourcePort())
    //     link.setSourcePort(newPort);
    //   if (portBefore === link.getTargetPort())
    //     link.setTargetPort(newPort);
    //   portBefore.remove();
    // });
  };

  clearSelection = () =>
    this.getEngine()
      .getModel()
      .clearSelection();

  getSelectedNodes = () =>
    this.engine
      .getModel()
      .getSelectedEntities()
      .filter((entity: any) => entity instanceof NodeModel);

  fireAction = (event: any) =>
    this.engine.getActionEventBus().fireAction({
      event: {
        ...event,
        key: '',
        preventDefault: () => {},
        stopPropagation: () => {},
      },
    });

  duplicateSelected = () =>
    this.fireAction({ type: 'keydown', ctrlKey: true, code: 'KeyD' });

  cutSelected = () =>
    this.fireAction({ type: 'keydown', ctrlKey: true, code: 'KeyX' });

  copySelected = () =>
    this.fireAction({ type: 'keydown', ctrlKey: true, code: 'KeyC' });

  pasteSelected = () =>
    this.fireAction({ type: 'keydown', ctrlKey: true, code: 'KeyV' });

  deleteSelected = () =>
    this.fireAction({ type: 'keydown', code: 'Delete' });

  undo = () =>
    this.fireAction({ type: 'keydown', ctrlKey: true, code: 'KeyZ' });

  redo = () =>
    this.fireAction({
      type: 'keydown',
      ctrlKey: true,
      shiftKey: true,
      code: 'KeyZ',
    });

  zoomIn = ({ event }: { event: any }) =>
    this.fireAction({
      clientX: event.clientX,
      clientY: event.clientY,
      type: 'wheel',
      deltaY: +1,
    });

  zoomOut = ({ event }: { event: any }) =>
    this.fireAction({
      clientX: event.clientX,
      clientY: event.clientY,
      type: 'wheel',
      deltaY: -1,
    });

  /**
   * Simulation methods
   */
  synchronizeLink = (id: any, value: any) =>
    this.getEngine()
      .getModel()
      .getLink(id)
      .setValue(value);

  synchronizeComponent = (id: any, diff: any) => {
    const component = this.getEngine()
      .getModel()
      .getNode(id);

    // Sets output port values
    Object.entries(diff.output).forEach(([name, value]) =>
      component.getPort(name).setValue(value),
    );

    // Sets custom properties
    Object.entries(diff.properties).forEach(([name, value]) => {
      component[name] = value;
    });
  };

  clearAllValues = () => {
    this.clearLinkValues();
    // this.clearPortValues();
  };

  clearLinkValues = () =>
    this.getEngine()
      .getModel()
      .getLinks()
      .forEach((link: any) => link.setValue(null));

  // clearPortValues = () =>
  //   this.getEngine()
  //     .getModel()
  //     .getNodes()
  //     .forEach(node =>
  //       Object.values(node.getPorts()).forEach(port =>
  //         port.setValue(null),
  //       ),
  //     );
}