//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');

const clearBtn = document.querySelector('.clear-tasks');

const filter = document.querySelector('#filter');

const taskInput = document.querySelector('#task');


//Function to load all event listners
loadEventListeners();


//create the function 
function loadEventListeners() {

  //DOM Load event when reloaded
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add Task event
  form.addEventListener('submit', addTask);

  //Remove task event listeners
  taskList.addEventListener('click', removeTask);

  //Clear tasks event
  clearBtn.addEventListener('click', clearTasks);

  //Filter tasks event
  filter.addEventListener('keyup', filterTasks);

}

//Add Task function
function addTask(event) {
  if (taskInput.value === '') {
    alert('Please add a task');
  }else{
  
  //Create li element
  const li = document.createElement('li');
  //Add class to li element
  li.className = 'collection-item';
  //create text node and append it to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement('a');
  //add a class
  link.className = 'delete-item secondary-content';
  //Add delete icon 
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);
  

  //Store tasks in local storage
  storeTaskInlocalStorage(taskInput.value);

  //Clear the input
  taskInput.value = '';

  console.log(li);
  event.preventDefault();
}
}

function storeTaskInlocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//function to get tasks from local storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
    //Create li element
  const li = document.createElement('li');
  //Add class to li element
  li.className = 'collection-item';
  //create text node and append it to li
  li.appendChild(document.createTextNode(task));
  //create new link element
  const link = document.createElement('a');
  //add a class
  link.className = 'delete-item secondary-content';
  //Add delete icon 
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);
  });
}
//function to remove task from screen
function removeTask(event) {
  if (event.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure you want to delete the task?')) {
      event.target.parentElement.parentElement.remove();

      //Remove from local storage
      removeTaskFromLocalStorage(event.target.parentElement.parentElement);
    }
  }

}

//Function to remove from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//function to clear all the task
function clearTasks() {
    if(confirm('Are you sure you want to clear all the saved tasks?')) {
      taskList.innerHTML = '';
  }
  //Clear local storage
  clearTaskFromLocalTrorage();
}

//function to clear from local storage when clear button is clicked
function clearTaskFromLocalTrorage() {
  localStorage.clear();
}

//Function to filter the tasks
function filterTasks(event) {
  const text = event.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });

  event.preventDefault();
}

