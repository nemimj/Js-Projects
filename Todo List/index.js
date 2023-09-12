const btn = document.querySelector(".btn");
const input = document.querySelector("input");
const items = document.querySelector(".items");

btn.addEventListener("click", () => {
  if (input.value == "") alert("Item field can't be empty");
  else {
    let ele = createItem();
    items.appendChild(ele);
    input.value = "";
  }
});

function createItem() {
  let ele = createElement("li");
  ele.innerText = input.value;
  ele.classList.add("item");
  let remove = removeButton();
  ele.appendChild(remove);
  return ele;
}

function removeButton() {
  const remove = document.createElement("span");
  remove.textContent = "X";
  remove.classList.add("remove");
  remove.addEventListener("click", () => {
    remove.parentElement.remove();
  });
  return remove;
}

function createElement(element) {
  let ele = document.createElement(element);
  return ele;
}
