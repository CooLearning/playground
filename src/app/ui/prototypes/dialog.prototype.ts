export const dialogPrototype = Object.create (null);

enum Errors {
  ContentNotDiv = 'The parent content node is not a `div`',
  NewContentNotHTML = 'Please provide an HTML element to add',
}

dialogPrototype.show = function () {
  this.node.showModal ();
};

dialogPrototype.hide = function () {
  this.node.close ();
};

dialogPrototype.attachEvents = function (closeButton) {
  if (typeof closeButton === 'undefined') {
    throw new Error ('Please provide a close button before attaching events');
  }

  // clicking close button
  closeButton.addEventListener ('click', () => {
    this.hide ();
  });

  // clicking outside container
  this.node.addEventListener ('click', (e) => {
    // MDL adds `open` HTML attribute to the dialog container (outside) only
    if (!e.target.open) {
      return;
    }
    this.hide ();
  });
};

dialogPrototype.purgeContent = function () {
  if (!(this.content instanceof HTMLDivElement)) {
    throw new Error (Errors.ContentNotDiv);
  }

  Array.from (this.content.children).forEach ((child: HTMLElement) => {
    this.content.removeChild (child);
  });
};

dialogPrototype.addContent = function (content: HTMLElement) {
  if (!(content instanceof HTMLElement)) {
    throw new Error (Errors.NewContentNotHTML);
  }
  if (!(this.content instanceof HTMLDivElement)) {
    throw new Error (Errors.ContentNotDiv);
  }
};
