// import {AbstractDialog} from './abstract.dialog';
// import {MappingChipComponent} from './components/mapping-chip.component';
// import {Store} from '../state/store';
// import {Views} from './views';
//
// interface LearnOptions {
//   parameter: string;
//   control: number;
//   type: string;
// }
//
// export class MappingsView extends AbstractDialog {
//   public parameterQueries = {
//     playPauseButton: document.getElementById('play-pause-button'),
//     learningRate: document.getElementById('learningRate'),
//     activation: document.getElementById('activations'),
//     regularizations: document.getElementById('regularizations'),
//     regularizationRate: document.getElementById('regularRate'),
//     problemType: document.getElementById('problem'),
//     addLayers: document.getElementById('add-layers'),
//     removeLayers: document.getElementById('remove-layers'),
//     ratioOfTrainingToTest: document.getElementById('percTrainData'),
//     noise: document.getElementById('noise'),
//     batchSize: document.getElementById('batchSize'),
//     showTestData: document.getElementById('show-test-data').parentNode,
//     discretize: document.getElementById('discretize').parentNode,
//   };
//
//   private store: Store;
//
//   private views: Views;
//
//   private nodeSelectors = {
//     tableContent: '.table-content',
//   };
//
//   private chips = {};
//
//   private tableContent: Element;
//
//   public constructor(store: Store, views: Views) {
//     super('#mappings');
//
//     this.store = store;
//     this.views = views;
//
//     this.tableContent = this.node.querySelector(this.nodeSelectors.tableContent);
//     this.buildTableContent();
//     this.loadInitialMappings();
//   }
//
//   private buildTableContent() {
//     Object.keys(this.parameterQueries).forEach((parameterName) => {
//       this.tableContent.appendChild(this.createContentRow(parameterName));
//     });
//   }
//
//   private createContentCell() {
//     const cell = document.createElement('td');
//     cell.classList.add('mdl-data-table__cell--non-numeric');
//     return cell;
//   }
//
//   private createContentRow(parameterName: string) {
//     const row = document.createElement('tr');
//
//     const parameterElement = this.createContentCell();
//     parameterElement.innerText = parameterName;
//
//     const chip = new MappingChipComponent({name: parameterName});
//     this.chips[parameterName] = chip;
//
//     const mappingElement = this.createContentCell();
//     mappingElement.appendChild(chip.getNode());
//
//     row.appendChild(parameterElement);
//     row.appendChild(mappingElement);
//
//     return row;
//   }
//
//   private learn({
//     parameter,
//     control,
//     type,
//   }: LearnOptions) {
//     if (this.store.mappings.isMapped(parameter)) {
//       this.store.mappings.disableLearningMode();
//       return;
//     }
//
//     this.store.mappings.setParameterMaps({parameter, control, type});
//
//     this.chips[parameter].update({
//       icon: type,
//       content: control,
//       isLearned: true,
//     });
//
//     this.views.notifications.notify(
//       `Learn: control ${control} for ${parameter} (${type})`,
//     );
//   }
//
//   private loadInitialMappings() {
//     const parameters = this.store.mappings.controlByParameter;
//     Object.keys(parameters).forEach((parameter) => {
//       this.chips[parameter].update({
//         icon: parameters[parameter].type,
//         content: parameters[parameter].control,
//         isLearned: true,
//       });
//     });
//   }
//
//   private unlearn(parameter: string) {
//     if (!this.store.mappings.isMapped(parameter)) {
//       return;
//     }
//
//     this.store.mappings.unsetParameterMaps(parameter);
//
//     this.chips[parameter].reset();
//
//     this.views.notifications.notify(`${parameter} unlearned`);
//   }
// }
