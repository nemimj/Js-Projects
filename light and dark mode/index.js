const button = document.querySelector(".button");
const box = document.querySelector(".box");
button.addEventListener("click", () => {
  button.classList.toggle("on");
  document.body.classList.toggle("dark");
});
