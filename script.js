// getting element from DOM and declaring variables
const inputField = document.querySelector(".inputField > input");
const addBtn = document.querySelector(".inputField > button");
const deleteAllBtn = document.querySelector(".footer > button");
const listOfTodos = document.querySelector(".todoList");
const horloge = document.querySelector(".wrapper >header > span");
const spanPendingTasks = document.querySelector(".pendingTasks");

//
pendingTasks = () => {
  spanPendingTasks.innerText = listArr.length;
};

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

//getLocalTime
let horlogeFun = () => {
  //time two number manager
  twoNum = (elem) => {
    if (elem < 10) {
      return (elem = "0" + elem);
    } else {
      return elem;
    }
  };
  let date = new Date();
  date.getDate;
  let fullDate = `${twoNum(date.getDate())}/${twoNum(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;
  return `${twoNum(date.getHours())}:${twoNum(
    date.getMinutes()
  )}  -   ${fullDate}`;
};

const showTasks = () => {
  let localStorageData = localStorage.getItem("tasks"); //get LocalStorage

  if (localStorageData == null || localStorageData.length == 0) return; //do nothing if no tasks
  newLiTag = "";
  listArr = JSON.parse(localStorageData); //turning localStorage string into an array
  listArr.forEach((element, index) => {
    horlogeFun();
    //create a list <li> with element
    newLiTag += `<li>  
      <input type="checkbox" id="">
      <i class="fa fa-check"></i>
      <p class="text">${element.title}</p>  
      <span class="icon" onclick="deleteTask(${index})">
        <i class="fas fa-trash"></i>
      </span>
    </li>
    <div class="createTime">${element.time}</div>`;
  });
  listOfTodos.innerHTML = newLiTag; //adding <li> into actual ul
  deleteAllBtnClassHandler(); //refreshing the btn class
  pendingTasks();
};

const refreshTasks = () => {
  let localStorageData = localStorage.getItem("tasks"); //get LocalStorage
  let userInputValue = inputField.value; //get UserInputValue
  let listArr = []; //declaring array
  if (localStorageData == null) {
    listArr = []; // if local storage empty then push an empty array
    localStorage.setItem("tasks", JSON.stringify(listArr));
  } else {
    if (localStorageData != 0) listArr = JSON.parse(localStorageData); //turning localStorage string into an array
    // if (localStorageData != 0) listArr = localStorageData.split(","); //turning localStorage string into an array
    if (userInputValue.trim() != 0) {
      listArr.push({ title: userInputValue, time: horlogeFun() }); //pushing userInputValue to the array
      localStorage.setItem(
        "tasks", //refreshing the localStorage
        JSON.stringify(listArr) //returning the array into a string
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
  listArr = JSON.parse(localStorageData); //turning localStorage string into an array
  listArr.splice(index, 1); //delete the task at index
  if (listArr.length > 0) {
    localStorage.setItem(
      "tasks", //refreshing the localStorage
      JSON.stringify(listArr) //returning the array into a string
    );
    showTasks();
  } else {
    localStorage.setItem("tasks", ""); //remove the last task from the localStorage
    listOfTodos.innerHTML = ""; //remove the last task from list
  }
  pendingTasks();
};

deleteAllBtn.onclick = () => {
  listArr = [];
  localStorage.setItem("tasks", listArr); //remove the tasks from localStorage
  listOfTodos.innerHTML = ""; //remove the tasks from list
  deleteAllBtn.classList.remove("active");
  pendingTasks();

};
