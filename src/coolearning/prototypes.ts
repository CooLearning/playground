HTMLElement.prototype.appendTo = function (parent) {
  parent.appendChild (this);
};

HTMLElement.prototype.prependTo = function (parent) {
  parent.insertBefore (this, parent.firstChild);
};
