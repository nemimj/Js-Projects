const form = document.querySelector("form");
const itemInput = document.querySelector("#addItem");
const itemList = document.querySelector(".items");
const clearAll = document.querySelector(".clear-all");
const items = itemList.querySelectorAll("li");
const filter = document.querySelector("#filter");
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

  // added check ui
  checkUI();
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
  checkUI();
}

function clearAllItems(e) {
  itemList.innerHTML = "";
  checkUI();
}

function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    filter.style.display = "none";
    clearAll.style.display = "none";
  } else {
    filter.style.display = "block";
    clearAll.style.display = "block";
  }
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  items.forEach((ele) => {
    const value = ele.innerText.toLowerCase();
    if (value.includes(filter.value.toLowerCase())) {
      ele.style.display = "flex";
    } else ele.style.display = "none";
  });
}

form.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearAll.addEventListener("click", clearAllItems);
filter.addEventListener("input", filterItems);
checkUI();
