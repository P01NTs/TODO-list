// getting element from DOM and declaring variables
const inputField = document.querySelector(".inputField > input");
const addBtn = document.querySelector(".inputField > button");
const deleteAllBtn = document.querySelector(".footer > button");
const listOfTodos = document.querySelector(".todoList");
const spanPendingTasks = document.querySelector(".pendingTasks");
const horloge = document.querySelector(".wrapper >header > span");
const instagram = document.querySelector(".instagram");
//

deleteAllBtnClassHandler = () => {
  let localStorageData = localStorage.getItem("tasks");
  localStorageData == null || localStorageData.length == 0
    ? deleteAllBtn.classList.remove("active")
    : deleteAllBtn.classList.add("active");
};
addBtnClassHandler = () => {
  let userInputValue = inputField.value;
  userInputValue.trim() != 0
    ? addBtn.classList.add("active")
    : addBtn.classList.remove("active");
};

const showTasks = () => {
  let localStorageData = localStorage.getItem("tasks"); //get LocalStorage
  if (localStorageData == null || localStorageData.length == 0) return; //do nothing if no tasks
  newLiTag = "";
  listArr = localStorageData.split(","); //turning localStorage string into an array
  listArr.forEach((element, index) => {
    //create a list <li> with element
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  listOfTodos.innerHTML = newLiTag; //adding <li> into actual ul
  deleteAllBtnClassHandler(); //refreshing the btn class
};

const refreshTasks = () => {
  let localStorageData = localStorage.getItem("tasks"); //get LocalStorage
  let userInputValue = inputField.value; //get UserInputValue
  let listArr = []; //declaring array
  if (localStorageData == null) {
    localStorage.setItem("tasks", ""); //create new localStorage
  } else {
    if (localStorageData != 0) listArr = localStorageData.split(","); //turning localStorage string into an array
    if (userInputValue.trim() != 0 && listArr.indexOf(userInputValue) == -1) {
      listArr.push(userInputValue); //pushing userInputValue to the array
      localStorage.setItem(
        "tasks", //refreshing the localStorage
        listArr.reduce((acumulator, item) => {
          return acumulator + "," + item; //returning the array into a string
        })
      );
      inputField.value = "";
    }
  }

  showTasks();
};
refreshTasks();

// pressEnter call addBtnonclick
inputField.onkeyup = (e) => {
  let userInputValue = inputField.value;
  if (e.which == 13 && userInputValue.trim() != 0) addBtn.click();
  addBtnClassHandler();
};

addBtn.onclick = () => {
  refreshTasks();
  addBtnClassHandler();
};

deleteTask = (index) => {
  let localStorageData = localStorage.getItem("tasks"); //get LocalStorage
  listArr = localStorageData.split(","); //turning localStorage string into an array
  listArr.splice(index, 1); //delete the task at index
  if (listArr.length > 0) {
    localStorage.setItem(
      "tasks", //refreshing the localStorage
      listArr.reduce((acumulator, item) => {
        return acumulator + "$" + item; //returning the array into a string
      })
    );
    showTasks();
  } else {
    localStorage.setItem("tasks", ""); //remove the last task from the localStorage
    listOfTodos.innerHTML = ""; //remove the last task from list
  }
};

deleteAllBtn.onclick = () => {
  localStorage.setItem("tasks", ""); //remove the tasks from localStorage
  listOfTodos.innerHTML = ""; //remove the tasks from list
  deleteAllBtn.classList.remove("active");
};

instagram.onclick = () => {
  
}