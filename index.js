const addSection = document.querySelector(".addSection");
const addTask = document.querySelector(".addTask");
const bigContainer = document.querySelector(".bigContainer");
const closeSectionModal = document.querySelector(".closeSectionModal");
const closeTaskModal = document.querySelector(".closeTaskModal");
const closeErrorModal = document.querySelector(".closeErrorModal");
const addSectionModal = document.querySelector(".addSectionModal");
const addTaskModal = document.querySelector(".addTaskModal");
const errorModal = document.querySelector(".errorModal");
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
const sectionsFromStorage = [];
// const sectionsFromStorage = localStorage.getItem(JSON.parse(sections));

let index = 1;
let color = "";
let firstSection;
let sectionNameValue = "";
let sectionColorValue = "";
let sectionModalIsOpen = false;
let taskModalIsOpen = false;
let taskExists = false;
let isFirstSection = true;
let draggingTask;

function gettingSectionsFromStorage() {
  sectionsFromStorage.forEach((section) => {
    const newSection = document.createElement("div");
    newSection.classList = `${section.classList}`;
    sectionsAdded.appendChild();
  });
}

gettingSectionsFromStorage();

function createTask() {
  const task = document.createElement("div");
  const taskTitle = document.createElement("h1");
  const taskDescription = document.createElement("p");

  task.appendChild(taskTitle);
  task.appendChild(taskDescription);
  taskTitle.innerText = taskTitleInput.value;
  taskDescription.innerText = taskDescriptionInput.value;
  task.className = "task firstSection";
  if (taskTitleInput.value && taskDescriptionInput.value) {
    firstSection.appendChild(task);
    closeModal(addTaskModal);
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

const handleAddSec = () => {
  if (!sectionName.value) return;
  taskExists = true;
  const newSection = document.createElement("div");
  newSection.className = `sectionClass ${sectionName.value}`;
  let classListStr = `sectionClass ${sectionName.value}`;
  if (isFirstSection) newSection.className = "sectionClass firstSection";
  newSection.style.backgroundColor = sectionColor.value;
  newSection.innerHTML = `<span class='sectionTitle'>${sectionName.value}</span>`;
  console.log(sectionName.value);
  index++;

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
      draggingTask.classList.add(`${section.classList.item(1)}`);
    });
  });

  sectionsFromStorage.push({
    classList: classListStr,
    sectionColor: sectionColor.value,
    sectionName: sectionName.value,
  });
  let sectionsFromStorageStringified = sectionsFromStorage.map((section) => {
    return JSON.stringify(section);
  });

  localStorage.setItem("sections", sectionsFromStorageStringified);
  closeModal(addSectionModal);
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
    console.log(event);
  });
});
