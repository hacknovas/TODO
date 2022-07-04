const form = document.querySelector("#itemForm");
const itemInput = document.querySelector("#itemInput");
const itemList = document.querySelector("#itemList");
const messageDiv = document.querySelector("#message");
const filters = document.querySelectorAll(".nav-item");

let TodosAll = [];

const handleItem = function (itemData) {
  const items = document.querySelectorAll(".list-group-item");
  items.forEach((item) => {
    if (
      item.querySelector(".title").getAttribute("data-time") == itemData.addedAt
    ) {
      item
        .querySelector("[data-delete]")
        .addEventListener("click", function (e) {
          e.preventDefault();
          itemList.removeChild(item);
          removeItem(item);
          if (TodosAll.length == 0) {
            checker();
          }
          setLocalStorage(TodosAll);
          return TodosAll.filter((item) => item != itemData);
        });
    }
  });
};


const removeItem = function (item) {
  const removeIndex = TodosAll.indexOf(item);
  TodosAll.splice(removeIndex, 1);
};

function checker() {

  itemList.insertAdjacentHTML(
    "beforeend",
    `<li class=" list-group-item d-flex justify-content-between align-items-center">
      No Items....
    </li>`
  )
}

const getList = function (TodosAll) {
  itemList.innerHTML = "";
  if (TodosAll.length > 0) {
    TodosAll.forEach((item) => {
      const iconClass = item.isDone;
      itemList.insertAdjacentHTML(
        "beforeend",
        `<li class="list-group-item d-flex justify-content-between align-items-center">
          <span class="title" data-time="${item.addedAt}">${item.name}</span> 
          <span>
              <a href="#" data-delete><i class="bi bi-x-circle black"></i></a>
          </span>
        </li>`
      );
      handleItem(item);
    });
  } else {
    checker();
  }
};

const getLocalStorage = function () {
  const todoStorage = localStorage.getItem("TodosAll");
  if (todoStorage == "undefined" || todoStorage == null) {
    TodosAll = [];
  } else {
    TodosAll = JSON.parse(todoStorage);
  }
  getList(TodosAll);
};

const setLocalStorage = function (TodosAll) {
  localStorage.setItem("TodosAll", JSON.stringify(TodosAll));
};

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const itemName = itemInput.value.trim();
    if (itemName.length == 0) {
      return;
    } else {
      const currenItemIndex = document.querySelector("#citem").value;
      if (currenItemIndex) {
        updateItem(currenItemIndex, itemName);
        document.querySelector("#citem").value = "";
      } else {
        const itemObj = {
          name: itemName,
          isDone: false,
          addedAt: new Date().getTime(),
        };
        TodosAll.push(itemObj);
        setLocalStorage(TodosAll);
      }

      getList(TodosAll);
    }
    console.log(TodosAll);
    itemInput.value = "";
  });
  
  getLocalStorage();
});
