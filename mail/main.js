const Router = require('./router');

document.addEventListener("DOMContentLoaded", () => {
  // debugger
  document.querySelectorAll('.sidebar-nav li').forEach( (element) => {

    addEventListener("click", (e) => {
      const location = e.target.innerText.toLowerCase();
      window.location.hash = location;
    });
  });

  const content = document.querySelector(".content");
  const router = new Router(content);
  router.start();
});
