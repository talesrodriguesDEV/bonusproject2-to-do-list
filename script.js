// Requisitos 5 e 6
let list = document.querySelector('ol');
let input = document.querySelector('input');
let button1 = document.querySelector('#criar-tarefa');
button1.addEventListener('click', addTask);
function addTask() {
    let newItem = document.createElement('li');
    list.appendChild(newItem);
    newItem.innerText = input.value;
    input.value = '';
    // Requisitos 7 e 8
    newItem.addEventListener('click', changeBackgroundColor);
    // Requisito 9
    newItem.addEventListener('dblclick', addCompletedTask);
}

// Requisitos 7 e 8
function changeBackgroundColor(event) {
    let items = document.querySelectorAll('li');
    for (let index = 0; index < items.length; index += 1) {
        items[index].style.backgroundColor = 'deepskyblue';
        items[index].classList.remove('selected');
    }
    event.target.style.backgroundColor = 'brown';
    event.target.classList.add('selected');      
}

// Requisito 9
function addCompletedTask(event) {
    if (event.target.style.textDecoration === 'line-through') {
        event.target.classList.remove('completed');
        event.target.style.textDecoration = 'none';
    } else {
        event.target.classList.add('completed');
        event.target.style.textDecoration = 'line-through';
    }
}

// Requisito 10
let button2 = document.querySelector('#apaga-tudo');
button2.addEventListener('click', deleteAllTasks);
function deleteAllTasks() {
    let items = document.querySelectorAll('li');
    for (let index = 0; index < items.length; index += 1) {
        items[index].remove();
    }
}

// Requisito 11
let button3 = document.querySelector('#remover-finalizados');
button3.addEventListener('click', removeCompletedTaks);
function removeCompletedTaks() {
    let completedTasks = document.querySelectorAll('.completed');
    for (let index = 0; index < completedTasks.length; index += 1) {
        completedTasks[index].remove();
    }
}

// Requisito 12
let button4 = document.querySelector('#salvar-tarefas');
button4.addEventListener('click', saveTasks);
function saveTasks() {
    localStorage.setItem('tasklist', JSON.stringify(list.innerHTML));
}
window.onload = function loadPreviousTasks() {
    list.innerHTML = JSON.parse(localStorage.getItem('tasklist'));
    let loadedItems = document.querySelectorAll('li');
    for (let index = 0; index < loadedItems.length; index += 1) {
        loadedItems[index].addEventListener('click', changeBackgroundColor);
        loadedItems[index].addEventListener('dblclick', addCompletedTask);
    }
}

// Requisito 13
let button5 = document.querySelector('#mover-cima');
button5.addEventListener('click', moveTaskUp);
function moveTaskUp() {
    let items = document.querySelectorAll('li');
    let selectedTask = document.querySelector('.selected');
    if (selectedTask === null) {
        return;
    }
    if (selectedTask.previousElementSibling === null) {
        window.alert('Erro!');
        return;
    }
    let previous = selectedTask.previousElementSibling;
    for (let index = 0; index < items.length; index += 1) {
        if (items[index] === selectedTask) {
            var selectedTaskIndex = index;
        }
    }
    let nextItems = [];
    for (let index = selectedTaskIndex + 1; index < items.length; index += 1) {
        nextItems.push(items[index]);
        items[index].remove();
    }
    previous.remove();
    list.appendChild(previous);
    for (index = 0; index < nextItems.length; index += 1) {
        list.appendChild(nextItems[index]);
    }
}
let button6 = document.querySelector('#mover-baixo');
button6.addEventListener('click', moveTaskDown);
function moveTaskDown() {
    let items = document.querySelectorAll('li');
    let selectedTask = document.querySelector('.selected');
    if (selectedTask === null) {
        return;
    }
    if (selectedTask.nextElementSibling === null) {
        window.alert('Erro!');
        return;
    }
    for (let index = 0; index < items.length; index += 1) {
        if (items[index] === selectedTask) {
            var selectedTaskIndex = index;
        }
    }
    let nextItems = [];
    for (let index = selectedTaskIndex + 2; index < items.length; index += 1) {
        nextItems.push(items[index]);
        items[index].remove();
    }
    document.querySelector('.selected').remove();
    list.appendChild(selectedTask);
    for (let index = 0; index < nextItems.length; index += 1) {
        list.appendChild(nextItems[index]);
    }
}

// Requisito 14
let button7 = document.querySelector('#remover-selecionado');
button7.addEventListener('click', removeTask);
function removeTask() {
    document.querySelector('.selected').remove();
}