// import { IconMaterialComponent } from './icon.material.component';
// import { mappingsState } from '../../state/mappings.state';
// import { mappingsUi } from '../mappings.ui';
//
// type MappingChipOptions = {
//   name: string;
//   icon?: string;
//   content?: string;
//   isLearned?: boolean;
// }
//
// export class MappingChipComponent {
//   private readonly name: string;
//
//   private readonly node: HTMLSpanElement;
//
//   private icon: HTMLSpanElement;
//
//   private content: HTMLSpanElement;
//
//   private action: HTMLAnchorElement;
//
//   constructor ({
//     name,
//     icon,
//     content,
//     isLearned,
//   }: MappingChipOptions) {
//     this.name = name;
//     this.node = this.createNode ();
//     this.icon = this.createIcon (icon);
//     this.content = this.createContent (content);
//     this.action = this.createAction (isLearned);
//
//     this.node.appendChild (this.icon);
//     this.node.appendChild (this.content);
//     this.node.appendChild (this.action);
//   }
//
//   getNode (): HTMLSpanElement {
//     return this.node;
//   }
//
//   createNode (): HTMLSpanElement {
//     const node = document.createElement ('span');
//     node.classList.add ('mdl-chip');
//     node.classList.add ('mdl-chip--contact');
//     node.classList.add ('mdl-chip--deletable');
//     return node;
//   }
//
//   createIcon (slug?: string): HTMLSpanElement {
//     const span = document.createElement ('span');
//     span.classList.add ('mdl-chip__contact');
//
//     if (slug === 'button') {
//       span.appendChild (IconMaterialComponent ('touch_app', '3px'));
//       span.style.background = 'rgba(0,255,0,.4)';
//     } else if (slug === 'range') {
//       span.appendChild (IconMaterialComponent ('swipe', '3px'));
//       span.style.background = 'rgba(0,0,255,.4)';
//     } else {
//       span.appendChild (IconMaterialComponent ('hourglass_empty', '3px'));
//     }
//
//     return span;
//   }
//
//   createContent (contentText?: string): HTMLSpanElement {
//     const content = document.createElement ('span');
//     content.classList.add ('mdl-chip__text');
//     content.style.userSelect = 'none';
//     content.innerHTML = contentText ? contentText : 'N/A';
//     return content;
//   }
//
//   createAction (isLearned: boolean): HTMLAnchorElement {
//     const action = document.createElement ('a');
//     action.classList.add ('mdl-chip__action');
//     if (isLearned === true) {
//       action.appendChild (IconMaterialComponent ('cancel'));
//       action.onclick = () => mappingsUi.unlearn (this.name);
//     } else {
//       action.appendChild (IconMaterialComponent ('school'));
//       action.onclick = () => mappingsState.enableLearningMode (this.name);
//     }
//     return action;
//   }
//
//   updateContent (content?: string): void {
//     const newContent = this.createContent (content);
//     this.node.replaceChild (newContent, this.content);
//     this.content = newContent;
//   }
//
//   updateIcon (icon?: string): void {
//     const newIcon = this.createIcon (icon);
//     this.node.replaceChild (newIcon, this.icon);
//     this.icon = newIcon;
//   }
//
//   updateAction (isLearned?: boolean): void {
//     const newAction = this.createAction (isLearned);
//     this.node.replaceChild (newAction, this.action);
//     this.action = newAction;
//   }
//
//   update ({
//     icon,
//     content,
//     isLearned,
//   }: {
//     icon: string;
//     content: string;
//     isLearned: boolean;
//   }): void {
//     this.updateIcon (icon);
//     this.updateContent (content);
//     this.updateAction (isLearned);
//   }
//
//   reset (): void {
//     this.updateIcon ();
//     this.updateContent ();
//     this.updateAction ();
//   }
// }
