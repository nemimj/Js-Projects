const form = document.querySelector("form");
const itemInput = document.querySelector("#addItem");
const itemList = document.querySelector(".items");
const clearAll = document.querySelector(".clear-all");
const items = itemList.querySelectorAll("li");
const filter = document.querySelector("#filter");
const btn = document.querySelector(".btn");
let isEditMode = false;



function displayItems() {
  const itemFromStorage = getItemFromStorage();
  itemFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();
  let newItem = itemInput.value;
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  if (isEditMode) {
    const itemTodEdit = itemList.querySelector(".edit-mode");
    removeItemFromStorage(itemTodEdit.textContent);
    itemTodEdit.remove();
    isEditMode = false;
  } else {
    if (checkDuplicateItem(newItem)) {
      alert("Item Already Exists");
      return;
    }
  }

  addItemToDOM(newItem);

  //add items to localStorage
  addItemToStorage(newItem);
  // added check ui
  checkUI();
  itemInput.value = "";
}

function addItemToDOM(item) {
  // creating a li element
  const li = document.createElement("li");
  li.classList.add("item");
  li.appendChild(document.createTextNode(item));
  const button = createButton();
  li.appendChild(button);

  itemList.appendChild(li);
}

function addItemToStorage(item) {
  let itemsFromStorage = getItemFromStorage();
  // Adding new items to array
  itemsFromStorage.push(item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
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

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function checkDuplicateItem(item) {
  const itemsFromStorage = getItemFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;
  itemList
    .querySelectorAll("li")
    .forEach(
      (i) => ((i.style.fontWeight = "bold"), i.classList.remove("edit-mode"))
    );
  item.style.fontWeight = "300";
  item.classList.add("edit-mode");

  btn.style.backgroundColor = "green";
  btn.innerText = "Update Item";
  itemInput.value = item.textContent;
}

function removeItem(item) {
  item.remove();

  // remove item from storage
  console.log(item.textContent);
  removeItemFromStorage(item.textContent);
  checkUI();
}

function removeItemFromStorage(item) {
  let itemFromStorage = getItemFromStorage();
  console.log(itemFromStorage);
  // removing the element from the array
  itemFromStorage = itemFromStorage.filter((i) => i !== item);

  // re assign the value
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
  checkUI();
}

function clearAllItems(e) {
  itemList.innerHTML = "";

  localStorage.removeItem("items");
  checkUI();
}

function checkUI() {
  itemInput.value = "";
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    filter.style.display = "none";
    clearAll.style.display = "none";
  } else {
    filter.style.display = "block";
    clearAll.style.display = "block";
  }

  btn.innerText = "+ Add Item";
  btn.style.backgroundColor = "#333";
  isEditMode = false;
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

form.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", onClickItem);
clearAll.addEventListener("click", clearAllItems);
filter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);
checkUI();
