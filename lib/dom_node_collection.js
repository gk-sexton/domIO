class DOMNodeCollection {
  constructor(HTMLElements) {
    this.HTMLElements = HTMLElements;
  }

  html(input) {
    if (typeof input === "string") {
      this.HTMLElements.forEach( element => {
        element.innerHTML = input;
      });
    } else {
      return this.HTMLElements[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(arg) {
    if (typeof arg === 'string'){
      this.HTMLElements.forEach( element =>{
        element.innerHTML += arg;
      });
    } else if (typeof arg === 'object'){
      arg = $l(arg);
      this.HTMLElements.forEach( element =>{
        element.innerHTML += arg.outerHTML;
      });
    }
  }

  attr(name, value) {
    if (value) {
      this.HTMLElements.forEach( element => {
        element.setAttribute(name, value);
      });
    } else {
      return this.HTMLElements[0].getAttribute(name);
    }
  }

  addClass(name) {
    this.HTMLElements.forEach( element => {
      element.classList.add(name);
    });  }

  removeClass(name) {
    this.HTMLElements.forEach( element => {
      element.classList.remove(name);
    });
  }

  children() {
    let childList = [];

    this.HTMLElements.forEach( element => {
      childList = childList.concat( element.children );
    });

    return new DOMNodeCollection(childList);
  }

  parent() {
    let parentList = [];

    this.HTMLElements.forEach( element => {
      parentList = parentList.concat( element.parentElement );
    });

    return new DOMNodeCollection(parentList);
  }

  find(selector) {
    let findList = [];

    this.HTMLElements.forEach( element => {
      findList = findList.concat( element.querySelectorAll(selector));
    });
    return new DOMNodeCollection(findList);
  }

  remove() {
    this.HTMLElements.forEach( element => {
      // element.outerHTML = "";
      element.parentElement.removeChild(element);
    });
  }

  on(type, callback){
    this.HTMLElements.forEach( element => {
      element.addEventListener(type, callback);
    });
  }

  off(type, callback){
    this.HTMLElements.forEach( element => {
      element.removeEventListener(type, callback);
    });
  }

  extend(...args) {
    return Object.assign(...args);
  }

  ajax(optionsHash) {
    const xhr = new XMLHttpRequest();

    const defaults = {
      type: 'GET',
      success: (data) => { console.log(data);},
      error: (data) => { console.log('Error!', data);}
    };

    const mergedArgs = this.extend(defaults, optionsHash);

    xhr.open(mergedArgs.type, mergedArgs.url);
    xhr.onload = () => {
      console.log(xhr.status);
      if (xhr.status === 200) {
        mergedArgs.success(xhr.response);
      } else {
        mergedArgs.error(xhr.response);
      }
    };

    xhr.send();
  }
}

module.exports = DOMNodeCollection;
