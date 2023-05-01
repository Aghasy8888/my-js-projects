// localStorage.clear();
const addSection = document.querySelector(".addSection");
const addTask = document.querySelector(".addTask");
const bigContainer = document.querySelector(".bigContainer");
const closeSectionModal = document.querySelector(".closeSectionModal");
const closeTaskModal = document.querySelector(".closeTaskModal");
const closeErrorModal = document.querySelector(".closeErrorModal");
const addSectionModal = document.querySelector(".addSectionModal");
const addTaskModal = document.querySelector(".addTaskModal");
const errorModal = document.querySelector(".errorModal");
const SecNameError = document.querySelector(".SecNameError");
const taskNameError = document.querySelector(".taskNameError");
const taskDescriptionError = document.querySelector(".taskDescriptionError");
const modal = document.querySelector(".modal");
const addSec = document.querySelector(".addSec");
const sectionsAdded = document.querySelector(".sectionsAdded");
const sectionName = document.querySelector(".sectionName");
const sectionColor = document.querySelector(".sectionColor");
const cancel = document.querySelector(".cancel");
const cancelSectionButton = document.querySelector(".cancelSectionButton");
const cancelTaskButton = document.querySelector(".cancelTaskButton");
const errorModalOkButton = document.querySelector(
  ".errorModal button:last-child"
);
const taskTitleInput = document.querySelector(".taskTitle");
const taskDescriptionInput = document.querySelector(".taskDescription");
const addSingleTaskButton = document.querySelector(".addSingleTask");
const tasks = [];
const sections = [];
const sectionNames = JSON.parse(localStorage.getItem("sectionNames"))
  ? JSON.parse(localStorage.getItem("sectionNames"))
  : [];
const taskNames = JSON.parse(localStorage.getItem("taskNames"))
  ? JSON.parse(localStorage.getItem("taskNames"))
  : [];
let tasksFromStorage = JSON.parse(localStorage.getItem("tasks"))
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

let sectionsFromStorageParsed = JSON.parse(localStorage.getItem("sectionsAll"))
  ? JSON.parse(localStorage.getItem("sectionsAll"))
  : [];

gettingSectionsFromStorage();
getTasksFromStorage();

let index = 1;
let color = "";
let firstSection = document.querySelector(".firstSection");
let sectionNameValue = "";
let sectionColorValue = "";
let sectionModalIsOpen = false;
let taskModalIsOpen = false;
let taskExists = sectionsFromStorageParsed ? true : false;
let isFirstSection = sectionsFromStorageParsed[0] ? false : true;
let draggingTask;

function saveTasks() {
  const tasksObjArray = [];
  const allTasks = document.querySelectorAll(".task");
  const allTasksArray = [...allTasks];
  allTasksArray.forEach((task) => {
    const titleAndDescription = [...task.childNodes];
    const titleAndDescriptionStrArray = titleAndDescription.map((task) => {
      return task.innerHTML;
    });

    tasksObjArray.push({
      classList: `${task.classList.value}`,
      taskTitle: titleAndDescriptionStrArray[0],
      taskDescription: titleAndDescriptionStrArray[1],
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasksObjArray));
}

function saveSections() {
  const sectionsObjArray = [];
  const allSections = document.querySelectorAll(".sectionClass");
  const allSectionsArray = [...allSections];

  allSectionsArray.forEach((section) => {
    sectionsObjArray.push({
      classList: section.classList.value,
      sectionColor: section.style.backgroundColor,
      sectionName: section.childNodes[0].innerHTML,
    });
  });
  localStorage.setItem("sectionsAll", JSON.stringify(sectionsObjArray));
}

window.onbeforeunload = function () {
  saveTasks();
  saveSections();
};

function getTasksFromStorage() {
  const taskArrayFromStorage = [];
  const taskElement = document.createElement("div");
  const taskTitle = document.createElement("h1");
  const taskDescription = document.createElement("p");
  taskElement.appendChild(taskTitle);
  taskElement.appendChild(taskDescription);

  if (sectionsFromStorageParsed[0] && tasksFromStorage) {
    tasksFromStorage.forEach((task) => {
      let taskClassListArray = task.classList.split(" ");
      sectionsFromStorageParsed.forEach((section) => {
        let sectionClassListArray = section.classList.split(" ");
        if (
          sectionClassListArray.includes(
            taskClassListArray[taskClassListArray.length - 1]
          )
        ) {
          const taskElement = document.createElement("div");
          const taskTitle = document.createElement("h1");
          const taskDescription = document.createElement("p");
          taskElement.appendChild(taskTitle);
          taskElement.appendChild(taskDescription);
          taskTitle.innerText = task.taskTitle;
          taskDescription.innerText = task.taskDescription;
          taskElement.className = task.classList;

          taskArrayFromStorage.push(taskElement);
          const currentSection = document.querySelector(
            `.sectionClass.${
              sectionClassListArray[sectionClassListArray.length - 1]
            }`
          );
          currentSection.appendChild(taskElement);
        }
      });
    });
  }

  taskArrayFromStorage.forEach((task) => {
    task.setAttribute("draggable", true);
    task.addEventListener("dragstart", function (event) {
      task.classList.remove(`${task.classList.item(1)}`);
      task.classList.add("dragging");
      draggingTask = document.querySelector(".dragging");
    });
    task.addEventListener("dragend", function (event) {
      task.classList.remove("dragging");
    });
  });
}

function createTask() {
  if (!taskTitleInput.value) {
    taskNameError.innerHTML = "Task Name Is Required";
    taskNameError.style.margin = "5px 162px";
    return;
  }
  if (taskNames.includes(taskTitleInput.value)) {
    taskNameError.innerHTML = "A Task With This Name Already Exists";
    taskNameError.style.margin = "5px 114px";
    return;
  }
  if (!taskDescriptionInput.value) {
    taskDescriptionError.innerHTML = "Task Description Is Required";
    return;
  }

  const task = document.createElement("div");
  const taskTitle = document.createElement("h1");
  const taskDescription = document.createElement("p");

  task.appendChild(taskTitle);
  task.appendChild(taskDescription);
  taskTitle.innerText = taskTitleInput.value;
  taskDescription.innerText = taskDescriptionInput.value;
  task.className = `task ${sectionNames[0]}`;
  if (taskTitleInput.value && taskDescriptionInput.value) {
    taskNames.push(taskTitleInput.value);
    localStorage.setItem("taskNames", JSON.stringify(taskNames));
    firstSection.appendChild(task);
    closeModal(addTaskModal);
    taskNameError.innerHTML = "";
  }

  tasks.push(task);

  tasks.forEach((task) => {
    task.setAttribute("draggable", true);
    task.addEventListener("dragstart", function (event) {
      task.classList.remove(`${task.classList.item(1)}`);
      task.classList.add("dragging");
      draggingTask = document.querySelector(".dragging");
    });
    task.addEventListener("dragend", function (event) {
      task.classList.remove("dragging");
    });
  });
  if (!sectionsFromStorageParsed[0] && !tasksFromStorage[0]) {
    saveTasks();
  }
}

const closeModalByClickingOut = (modalOpenButton, thisModal) => {
  // Check if the clicked element is outside of the modal
  if (
    !thisModal.contains(event.target) &&
    !event.target.matches(modalOpenButton)
  ) {
    // If it is, close the modal
    closeModal(thisModal);
  }
};

const openModal = (modal) => {
  modal.style.display = "block";
};

const closeModal = (modal) => {
  modal.style.display = "none";
  sectionName.value = "";
  taskTitleInput.value = "";
  taskDescriptionInput.value = "";
  sectionColor.value = "#000000";
};

function gettingSectionsFromStorage() {
  const sectionElements = [];

  if (sectionsFromStorageParsed[0]) {
    sectionsFromStorageParsed.forEach((section) => {
      const newSection = document.createElement("div");
      newSection.classList = `${section.classList}`;
      newSection.style.backgroundColor = section.sectionColor;
      newSection.innerHTML = `<span class='sectionTitle'>${section.sectionName}</span>`;
      sectionsAdded.appendChild(newSection);

      sectionElements.push(newSection);
    });
    sectionElements.forEach((section) => {
      section.addEventListener("dragover", function (event) {
        event.preventDefault();
      });
      section.addEventListener("drop", function (event) {
        section.appendChild(draggingTask);
        if (section.classList.value.includes("firstSection")) {
          draggingTask.classList.add(`${section.classList.item(2)}`);
        } else {
          draggingTask.classList.add(`${section.classList.item(1)}`);
        }
      });
    });
  }
}

const handleAddSec = () => {
  if (!sectionName.value) {
    SecNameError.innerHTML = "Section Name Is Required";
    return;
  }
  if (sectionNames.includes(sectionName.value)) {
    SecNameError.innerHTML = "A Section With This Name Already Exists";
    return;
  }
  taskExists = true;
  const newSection = document.createElement("div");
  newSection.className = `sectionClass ${sectionName.value}`;
  sectionNames.push(sectionName.value);
  localStorage.setItem("sectionNames", JSON.stringify(sectionNames));
  if (isFirstSection) {
    newSection.className = `sectionClass firstSection ${sectionNames[0]}`;
  }
  newSection.style.backgroundColor = sectionColor.value;
  newSection.innerHTML = `<span class='sectionTitle'>${sectionName.value}</span>`;
  index++;

  classListStr = newSection.className;
  sectionsAdded.appendChild(newSection);
  firstSection = document.querySelector(".firstSection");

  isFirstSection = false;

  sections.push(newSection);

  sections.forEach((section) => {
    section.addEventListener("dragover", function (event) {
      event.preventDefault();
    });
    section.addEventListener("drop", function (event) {
      section.appendChild(draggingTask);
      draggingTask.classList.add(`${section.childNodes[0].innerHTML}`);
    });
  });

  closeModal(addSectionModal);
  SecNameError.innerHTML = "";
  if (!sectionsFromStorageParsed[0] && !tasksFromStorage[0]) {
    saveTasks();
  }
};

addSection.addEventListener("click", () => {
  openModal(addSectionModal);
  sectionModalIsOpen = true;
});

addTask.addEventListener("click", () => {
  if (taskExists) {
    openModal(addTaskModal);
    taskModalIsOpen = true;
  } else {
    errorModal.style.display = "block";
  }
});

addSingleTaskButton.addEventListener("click", createTask);

closeSectionModal.addEventListener("click", () => closeModal(addSectionModal));
closeTaskModal.addEventListener("click", () => closeModal(addTaskModal));
closeErrorModal.addEventListener("click", () => closeModal(errorModal));

cancelSectionButton.addEventListener("click", () =>
  closeModal(addSectionModal)
);
cancelTaskButton.addEventListener("click", () => closeModal(addTaskModal));
errorModalOkButton.addEventListener("click", () => closeModal(errorModal));

addSec.addEventListener("click", handleAddSec);
document.addEventListener("keypress", function (event) {
  if (sectionModalIsOpen) {
    if (event.keyCode === 13) {
      handleAddSec();
    }
  }
  if (taskModalIsOpen) {
    if (event.keyCode === 13) {
      createTask();
    }
  }
});

document.addEventListener("mousedown", function (event) {
  addTaskModal.style.display === "block" &&
    closeModalByClickingOut(".addTask", addTaskModal);
  addSectionModal.style.display === "block" &&
    closeModalByClickingOut(".addSection", addSectionModal);
  errorModal.style.display === "block" &&
    closeModalByClickingOut(".addTask", errorModal);
});

tasks.forEach((task) => {
  task.setAttribute("draggable", true);
  task.addEventListener("dragstart", function (event) {
  });
});
