const drag = document.querySelector(".drag");

drag.addEventListener("dragend", (e) => {
  drag.style.left = `${e.clientX}px`;
  drag.style.top = `${e.clientY}px`;
});

drag.addEventListener("drag", (e) => {
  drag.style.left = `${e.clientX}px`;
  drag.style.top = `${e.clientY}px`;
});
