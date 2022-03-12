const addBtn = document.querySelector(".inputField > button");
const inputField = document.querySelector(".inputField > input");
const addItemToList = document.createElement("li");
const listOfTodos = document.querySelector(".todoList");
const spanPendingTasks = document.querySelector(".pendingTasks");
const deleteAllBtn = document.querySelector(".footer > button");

var listArr = [];

// addBtn classHandler
addBtnClassHandler = () => {
  let userInputValue = inputField.value;
  if (userInputValue.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};
deleteAllBtnClassHandler = () => {
  if (listOfTodos.innerHTML != 0){
    deleteAllBtn.classList.add("active");
  }else{
    deleteAllBtn.classList.remove("active");
  }
}
inputField.onkeyup = () => {
  addBtnClassHandler();
};

let pendingTasksNumb = () => {
  if (listOfTodos.innerText == 0) {
    spanPendingTasks.innerText = "0";
  } else {
    spanPendingTasks.innerText = listArr.length;
  }
};

let showTasks = () => {
  listOfTodos.innerHTML = "";
  newLiTag = "";
  listArr.map((elem, index) => {
    newLiTag += `<li>${elem}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  listOfTodos.innerHTML = newLiTag;
  pendingTasksNumb();
  deleteAllBtnClassHandler()
};

let deleteTask = (n) => {
  listArr.splice(n, 1);
  showTasks();
};

addBtn.onclick = () => {
  if (listArr.indexOf(inputField.value) == -1) {
    listArr.push(inputField.value);
    showTasks();
    inputField.value = "";
  } else {
    inputField.value = "";
  }
  addBtnClassHandler();
  pendingTasksNumb();
};
pendingTasksNumb();

deleteAllBtn.onclick = () => {
  listArr = [];
  showTasks();

}
