const DOMNodeCollection = require('./dom_node_collection');

function core(arg) {
  if (arg.constructor.name === 'String') {
    const nodeList = document.querySelectorAll(arg);
    return new DOMNodeCollection(Array.from(nodeList));
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else {
    return new DOMNodeCollection(document);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.$l = core;
});
