const pathArray = window.location.pathname.split("/");
const filename = pathArray[pathArray.length - 1];

const global = {
  currentPage: filename,
};

async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");
  results.forEach((show) => {
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="movie-details.html?id=${show.id}">
     ${
       show.poster_path
         ? ` <img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        alt="Movie Title"
        class="card-img-top"
      />`
         : `
      <img
      src="/10. Flix Movie Project/images/no-image.jpg"
      alt="Movie Title"
      class="card-img-top"
    />`
     }
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${show.first_air_date}</small>
      </p>
    </div>`;
    console.log(show);
    document.querySelector("#popular-shows").appendChild(div);
  });
}

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
     ${
       movie.poster_path
         ? ` <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        alt="Movie Title"
        class="card-img-top"
      />`
         : `
      <img
      src="/10. Flix Movie Project/images/no-image.jpg"
      alt="Movie Title"
      class="card-img-top"
    />`
     }
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>`;

    document.querySelector("#popular-movies").appendChild(div);
  });
}

// Fetching Data from moviesapi
async function fetchAPIData(endpoint) {
  showSpinner();
  const response = await fetch(
    `https://api.themoviedb.org/3/${endpoint}?api_key=4c3b7a975301fb951443d3ae9944e6ff`
  );
  const data = await response.json();
  hideSpinner();
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

// show spinner

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

// hide spinner
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// Routers
function init() {
  switch (global.currentPage) {
    case "index.html":
      console.log("Home");
      displayPopularMovies();
      break;
    case "shows.html":
      console.log("Shows");
      displayPopularShows();
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
