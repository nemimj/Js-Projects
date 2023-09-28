const pathArray = window.location.pathname.split("/");
const filename = pathArray[pathArray.length - 1];

const global = {
  currentPage: filename,
};

// Fetching Data from moviesapi

async function fetchAPIData(endpoint) {
  const API_KEY = "4c3b7a975301fb951443d3ae9944e6ff";
  const API_URL = "https://api.themoviedb.db.org/3/";

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data;
}

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
