import {DevicesController} from './new/controllers/devices.controller';
import {Notifications} from './new/views/notifications';
import {ModalHelpController} from './new/controllers/modal-help.controller';
import {
  ModalPresetsController,
} from './new/controllers/modal-presets.controller';
import {
  ModalDevicesController,
} from './new/controllers/modal-devices.controller';
import {ModalPresetsView} from './new/views/modal-presets.view';
import {ModalDevicesView} from './new/views/modal-devices.view';
import {ModalHelpView} from './new/views/modal-help.view';
import {ModalImportsExportsView} from './new/views/modal-imports-exports.view';
import {
  ModalImportsExportsController,
} from './new/controllers/modal-imports-exports.controller';
import {ModalMappingsView} from './new/views/modal-mappings.view';
import {
  ModalMappingsController,
} from './new/controllers/modal-mappings.controller';
import {SelectCardController} from './new/controllers/select-card.controller';
import {PlaygroundController} from './new/controllers/playground.controller';
import {PlaygroundView} from './new/views/playground.view';
import {PlaygroundFacade} from './new/facades/playground.facade';
import {SelectCardView} from './new/views/select-card.view';
import {NetworkController} from './new/controllers/network.controller';
import {LayerCardView} from './new/views/layer-card.view';
import {LayerCardController} from './new/controllers/layer-card.controller';

interface Facades {
  playground?: PlaygroundFacade;
}

interface Controllers {
  playground?: PlaygroundController;
  network?: NetworkController;
  presets?: ModalPresetsController;
  importsExports?: ModalImportsExportsController;
  mappings?: ModalMappingsController;
  modalDevices?: ModalDevicesController;
  help?: ModalHelpController;
  selectCard?: SelectCardController;
  layerCard?: LayerCardController;
}

interface Views {
  playground?: PlaygroundView;
  presets?: ModalPresetsView;
  importsExports?: ModalImportsExportsView;
  mappings?: ModalMappingsView;
  modalDevices?: ModalDevicesView;
  help?: ModalHelpView;
  selectCard?: SelectCardView;
  layerCard?: LayerCardView;
}

export class Coolearning {
  public facades: Facades = {};

  private notifications: Notifications;

  private devices: DevicesController;

  private controllers: Controllers = {};

  private views: Views = {};

  constructor() {
    this.init();
  }

  private async load() {
    this.facades.playground = new PlaygroundFacade();

    this.notifications = await Notifications.create();
    this.notifications.notify({message: 'hello'});

    this.devices = new DevicesController();

    this.views.playground = new PlaygroundView();
    this.controllers.playground = new PlaygroundController(this.views.playground);

    this.controllers.network = new NetworkController();
    this.controllers.playground.addObserver(this.controllers.network);

    this.views.presets = new ModalPresetsView();
    this.controllers.presets = new ModalPresetsController(this.views.presets);

    this.views.importsExports = new ModalImportsExportsView();
    this.controllers.importsExports = new ModalImportsExportsController(this.views.importsExports);

    this.views.mappings = new ModalMappingsView();
    this.controllers.mappings = new ModalMappingsController(this.views.mappings);

    this.views.modalDevices = new ModalDevicesView();
    this.controllers.modalDevices = new ModalDevicesController(this.views.modalDevices, this.devices);
    this.devices.addObserver(this.views.modalDevices);

    this.views.help = new ModalHelpView();
    this.controllers.help = new ModalHelpController(this.views.help);

    this.views.selectCard = new SelectCardView();
    this.controllers.selectCard = new SelectCardController(this.views.selectCard);
    this.controllers.network.addObserver(this.controllers.selectCard);

    this.views.layerCard = new LayerCardView();
    this.controllers.layerCard = new LayerCardController(this.views.layerCard);
    this.controllers.network.addObserver(this.controllers.layerCard);

    // this.printVersion();
  }

  private init() {
    window.addEventListener('load', () => {
      this.load().then();
      // .catch((error) => {
      //   // eslint-disable-next-line no-console
      //   console.error(error);
      //   this.notifications.notify({
      //     message: error.toString(),
      //     timeout: 5000,
      //   });
      // });
    });
  }

  private printVersion() {
    // eslint-disable-next-line no-console
    console.log({version: 'lol'}); // todo: replace
  }
}
