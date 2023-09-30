const pathArray = window.location.pathname.split("/");
const filename = pathArray[pathArray.length - 1];

const global = {
  currentPage: filename,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 1,
  },
};

async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");
  results.forEach((show) => {
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="tv-details.html?id=${show.id}">
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

async function displayShows() {
  // passing the value from one page to another page using link (127.0.0.1/movies.html&id=1234)
  const movieId = window.location.search.split("=");

  const show = await fetchAPIData(`tv/${movieId[1]}`);
  displayBackgroundImage("show", show.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    show.poster_path
      ? `<img
    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
    class="card-img-top"
    alt="${show.title}"
  />`
      : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${show.title}"
/>`
  }
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      
      ${show.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${show.last_air_date}</p>
    <p>
      ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="${
      show.homepage
    }" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">No Of Episodes:</span> ${
      show.number_of_episodes
    }</li>
    <li><span class="text-secondary">Last Episode To Air:</span> ${
      show.last_episode_to_air
    }</li>
   
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
    ${show.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(", ")}
  </div>
</div>
  `;
  document.querySelector("#show-details").appendChild(div);
}

// display slider
async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");
  results.forEach((movie) => {
    let div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = ` <a href="movie-details.html?id=${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
   </a>
   <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
    </h4>`;
    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
}

// swiper
function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// search

async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");

  if (global.search.term !== "" && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.totalPages = total_pages;
    global.search.page = page;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert("No Results Found");
      return;
    }

    displaySearchResults(results);
    document.querySelector("#search-term").value = "";
  } else {
    showAlert("Please enter a search term");
  }
}

function displaySearchResults(results) {
  results.forEach((result) => {
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="${global.search.type}-details.html?id=${result.id}">
     ${
       result.poster_path
         ? ` <img
        src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
        alt="${global.search.type === "movie" ? result.title : result.name}"
        class="card-img-top"
      />`
         : `
      <img
      src="/10. Flix Movie Project/images/no-image.jpg"
      alt="${global.search.type === "movie" ? result.title : result.name}"
      class="card-img-top"
    />`
     }
    </a>
    <div class="card-body">
      <h5 class="card-title">${
        global.search.type === "movie" ? result.title : result.name
      }</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${
          global.search.type === "movie"
            ? result.release_date
            : result.first_air_date
        }</small>
      </p>
    </div>`;

    document.querySelector("#search-results-heading").innerHTML = `
    <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`;

    document.querySelector("#search-results").appendChild(div);
  });

  displayPagination();
}

// previous and next page results

function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`;

  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  }

  if (global.search.page === global.search.totalPages) {
    document.querySelector("#next").disabled = true;
  }
}

// search for a term using api
async function searchAPIData() {
  showSpinner();
  const response = await fetch(
    `https://api.themoviedb.org/3/search/${global.search.type}?query=${global.search.term}&api_key=4c3b7a975301fb951443d3ae9944e6ff&`
  );

  const data = await response.json();
  hideSpinner();

  return data;
}

// show Alert

function showAlert(message, className = "error") {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(alertEl);

  setTimeout(() => {
    alertEl.remove();
  }, 3000);
}

// display background Image
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
      displaySlider();
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
      displayShows();
      break;
    case "search.html":
      console.log("Search");
      search();
      break;
  }
  hightlightActiveLink();
}

// runs on every page
document.addEventListener("DOMContentLoaded", init);
