const pathArray = window.location.pathname.split("/");
const filename = pathArray[pathArray.length - 1];

const global = {
  currentPage: filename,
};

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
}

document.addEventListener("DOMContentLoaded", init);
