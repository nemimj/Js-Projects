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

async function displayMovies() {
  // passing the value from one page to another page using link (127.0.0.1/movies.html&id=1234)
  const movieId = window.location.search.split("=");
  const movie = await fetchAPIData(`movie/${movieId[1]}`);
  displayBackgroundImage("movie", movie.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    movie.poster_path
      ? `<img
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
  />`
      : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${movie.title}"
/>`
  }
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
      ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="${
      movie.homepage
    }" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
      movie.budget
    )}</li>
    <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
      movie.revenue
    )}</li>
    <li><span class="text-secondary">Runtime:</span> ${
      movie.runtime
    } minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
    ${movie.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(", ")}
  </div>
</div>
  `;
  console.log(movie);
  document.querySelector("#movie-details").appendChild(div);
}

function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");

  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

// show spinner
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

// hide spinner
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// adding commas to numbers
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      displayMovies();
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
