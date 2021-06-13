const taskForm = document.querySelector(".js-taskForm"),
  taskInput = document.querySelector(".todo__input"),
  pendingTaskList = document.querySelector(".js-pendingTaskList"),
  finishedTaskList = document.querySelector(".js-finishedTaskList");

const PENDINGTASKS_LS = "pendingTasks";
const FINISHEDTASKS_LS = "finishedTasks";
const PENDING_KEY = "pendingKey";
const FINISHED_KEY = "finishedKey";

let pendingTasks = [];
let finishedTasks = [];
let idNum = 1;

function penToFinTask(event) {
  const btn = event.target;
  const li = btn.parentNode;
  let targetTaskText;
  pendingTasks.forEach(function (task) {
    if (task.id === parseInt(li.id)) {
      targetTaskText = task.text;
    }
  });
  paintTask(targetTaskText, FINISHED_KEY);
  deleteTask(event);
}

function finToPenTask(event) {
  const btn = event.target;
  const li = btn.parentNode;
  let targetTaskText;
  finishedTasks.forEach(function (task) {
    if (task.id === parseInt(li.id)) {
      targetTaskText = task.text;
    }
  });
  paintTask(targetTaskText, PENDING_KEY);
  deleteTask(event);
}

function deleteTask(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const list = li.parentNode;
  list.removeChild(li);
  const cleanPendingTasks = pendingTasks.filter(function (task) {
    return task.id !== parseInt(li.id);
  });
  pendingTasks = cleanPendingTasks;
  saveTasks(PENDING_KEY);
  const cleanFinishedTasks = finishedTasks.filter(function (task) {
    return task.id !== parseInt(li.id);
  });
  finishedTasks = cleanFinishedTasks;
  saveTasks(FINISHED_KEY);
}

function saveTasks(key) {
  if (key === PENDING_KEY)
    localStorage.setItem(PENDINGTASKS_LS, JSON.stringify(pendingTasks));
  else localStorage.setItem(FINISHEDTASKS_LS, JSON.stringify(finishedTasks));
}

function paintTask(text, key) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  delBtn.classList.add("delBtn");
  const newId = idNum;
  idNum += 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteTask);
  span.innerText = text;
  li.id = newId;
  if (key === PENDING_KEY) {
    const penBtn = document.createElement("button");
    penBtn.classList.add("penBtn");
    penBtn.innerText = "⚪";
    li.appendChild(penBtn);
    pendingTaskList.appendChild(li);
    penBtn.addEventListener("click", penToFinTask);
    const pendingTaskObj = {
      text: text,
      id: newId,
      key: PENDING_KEY
    };
    pendingTasks.push(pendingTaskObj);
  } else {
    const finBtn = document.createElement("button");
    finBtn.classList.add("finBtn");
    finBtn.innerText = "⚫";
    li.appendChild(finBtn);
    finishedTaskList.appendChild(li);
    finBtn.addEventListener("click", finToPenTask);
    const finishedTaskObj = {
      text: text,
      id: newId,
      key: FINISHED_KEY
    };
    finishedTasks.push(finishedTaskObj);
  }
  li.appendChild(span);
  li.appendChild(delBtn);
  saveTasks(key);
}

function handleSubmit(event) {
  event.preventDefault();
  console.log("good");
  const currentValue = taskInput.value;
  paintTask(currentValue, PENDING_KEY);
  taskInput.value = "";
}

function loadTasks() {
  const loadedPendingTasks = localStorage.getItem(PENDINGTASKS_LS);
  const loadedFinishedTasks = localStorage.getItem(FINISHEDTASKS_LS);
  if (loadedPendingTasks !== null) {
    const parsedLoadedPendingTasks = JSON.parse(loadedPendingTasks);
    parsedLoadedPendingTasks.forEach(function (task) {
      paintTask(task.text, task.key);
    });
  }
  if (loadedFinishedTasks !== null) {
    const parsedLoadedFinishedTasks = JSON.parse(loadedFinishedTasks);
    parsedLoadedFinishedTasks.forEach(function (task) {
      paintTask(task.text, task.key);
    });
  }
}

function init() {
  loadTasks();
  taskForm.addEventListener("submit", handleSubmit);
}

init();