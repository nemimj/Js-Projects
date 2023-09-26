function fetchUser() {
  fetch("https://randomuser.me/api/")
    .then((res) => {
      return res.json();
    })
    .then((data) => displayUser(data.results[0]));
}

function displayUser(user) {
  if (user.gender === "female") {
    document.body.style.backgroundColor = "lightpink";
  } else {
    document.body.style.backgroundColor = "coral";
  }

  let userDisplay = document.querySelector(".container");
  userDisplay.innerHTML = `
  
  <div class="img">
    <img src="${user.picture.large}" alt="" />
  </div>
  <div class="img-details">
    <h3>Name : ${user.name.first}</h3>
    <h3>Email : ${user.email}</h3>
    <h3>Phone : ${user.phone}</h3>
    <h3>Location : ${user.location.city}</h3>
  </div>`;
}

fetchUser();
document.querySelector(".btn").addEventListener("click", () => {
  fetchUser();
});
