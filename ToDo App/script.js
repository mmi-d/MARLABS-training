const inputText = document.getElementById("userinp"),
  displayList = document.getElementById("items"),
  form = document.getElementById("form");

const localStorageList = JSON.parse(localStorage.getItem("listToDis"));

let listToDis =
  localStorage.getItem("listToDis") !== null ? localStorageList : [];
// let listToDis = [];
inputText.focus();
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

flag = null;

function addList(e) {
  e.preventDefault();
  if (inputText.value === "") {
    alert("Please enter your input.");
  } else if (flag !== null && flag === true) {
    listToDis[newIndex].text = inputText.value;
    init();
    flag = false;
  } else {
    list = {
      id: generateID(),
      text: inputText.value,
    };
    listToDis.push(list);
    addListToDOM(list);
    updateLocalStorage();
  }
}
function addListToDOM(listSingle) {
  const listInput = document.createElement("li");
  listInput.innerHTML = `
      <li class="item" id="item">${listSingle.text}
              <div class="btn">
                  <button class="editBtn" onclick="editEntry(${listSingle.id})">Edit</button>
                  <button class="deleteBtn" onclick="removeEntry(${listSingle.id})">Delete</button>
              </div>
          </li>
      `;
  displayList.appendChild(listInput);
  inputText.value = "";
}

function editEntry(id) {
  flag = true;
  let newText;
  //   let newIndex;
  listToDis.forEach((val, index) => {
    if (listToDis[index].id === id) {
      newText = val.text;
      newIndex = index;
    }
  });
  inputText.value = newText;
  inputText.focus();
  inputText.addEventListener("change", (e) => {
    e.preventDefault();
    if (flag === true) {
      listToDis[newIndex].text = inputText.value;
    }

    addList;
    updateLocalStorage();
  });
}

function removeEntry(id) {
  listToDis = listToDis.filter((list) => list.id !== id);
  init();
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem("listToDis", JSON.stringify(listToDis));
}

function init() {
  inputText.focus();
  displayList.innerHTML = "";
  listToDis.forEach(addListToDOM);
}

init();

form.addEventListener("submit", addList);
