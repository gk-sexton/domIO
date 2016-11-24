class Router{
  constructor(node){
    this.node = node;
  }

  start(){
    this.render();
    window.addEventListener("hashchange", () =>{
      this.render();
    });
  }

  activeRoute(){
    return window.location.hash.slice(1);
  }

  render(){
    this.node.innerHTML = "";
    const route = this.activeRoute();
    const node = document.createElement("p");
    this.node.innerHTML = route;
    this.node.appendChild(node);
  }
}

module.exports = Router;
