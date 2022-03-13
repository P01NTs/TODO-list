deleteAllBtnClassHandler = () => {
  listOfTodos.innerHTML != 0
    ? deleteAllBtn.classList.remove("active")
    : deleteAllBtn.classList.add("active");
};

//
//

deleteAllBtn.onclick = () => {
  showTasks();
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
  horloge.textContent =
    twoNum(date.getHours()) +
    ":" +
    twoNum(date.getMinutes()) +
    ":" +
    twoNum(date.getSeconds());
  setTimeout(horlogeFun, 1000);
};
horlogeFun(); //get LocalTime Call

// number of pending todos
let pendingTasksNumb = () => (spanPendingTasks.innerText = listArr.length);

pendingTasksNumb();

// delete one Task
let deleteTask = (n) => {
  listArr.splice(n, 1);
  showTasks();
};
