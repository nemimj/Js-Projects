const pathArray = window.location.pathname.split("/");
const filename = pathArray[pathArray.length - 1];

const global = {
  currentPage: filename,
};

function hightlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

// Routers
function init() {
  switch (global.currentPage) {
    case "index.html":
      console.log("Home");
      break;
    case "shows.html":
      console.log("Shows");
      break;
    case "movie-details.html":
      console.log("Movie Details");
      break;
    case "tv-details.html":
      console.log("Tv Details");
      break;
    case "search.html":
      console.log("Search");
      break;
  }
  hightlightActiveLink();
}

// runs on every page
document.addEventListener("DOMContentLoaded", init);
