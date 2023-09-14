const form = document.querySelector("form");
const itemInput = document.querySelector("#addItem");
const itemList = document.querySelector(".items");

function addItem(e) {
  e.preventDefault();
  let newItem = itemInput.value;
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // creating a li element
  const li = document.createElement("li");
  li.classList.add("item");
  li.appendChild(document.createTextNode(newItem));
  const button = createButton();
  li.appendChild(button);

  itemList.appendChild(li);
  itemInput.value = "";
}

function createButton() {
  const button = document.createElement("button");
  button.classList.add("remove");
  const icon = createIcon("fa-solid fa-circle-xmark fa-2x");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove();
  }
}

form.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
