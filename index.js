'use strict';

const setupDeleteBtn = btn => {
    btn.addEventListener('click', ()  => {
        btn.parentNode.remove();
        let todos = fetchTodos();
        let newTodos = todos.filter(todo => todo != btn.previousSibling.textContent);
        localStorage.setItem('todos', JSON.stringify(newTodos));
        createCompleted(btn.previousSibling.textContent);
        renderCompletedTxt();
    });
}

const fetchTodos = () => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    return todos;
}

const fetchCompleted = () => {
    let completed = JSON.parse(localStorage.getItem('completed')) || [];
    return completed;
}

const fetchCompletedNo = () => {
    let completedNo;
    if (JSON.parse(localStorage.getItem('completed'))) {
        completedNo = JSON.parse(localStorage.getItem('completed')).length;
    } else {
        completedNo = 0;
    }
    return completedNo;    
}

const renderTodoUI = name => {
    const li = document.createElement('li');
    const todoName = document.createElement('p');
    const checkButton = document.createElement('div');
    setupDeleteBtn(checkButton);
    const ul = document.querySelector('.todos__list');
    todoName.textContent = name;
    checkButton.classList.add('circle');
    li.appendChild(todoName);
    li.appendChild(checkButton);
    ul.appendChild(li);
}

const renderCompletedUI = name => {
    const li = document.createElement('li');
    const completedName = document.createElement('p');
    const checkButton = document.createElement('span');
    const ul = document.querySelector('.completed__list');
    completedName.textContent = name;
    checkButton.classList.add('material-icons-outlined');
    checkButton.textContent = 'done';
    li.appendChild(completedName);
    li.appendChild(checkButton);
    ul.appendChild(li);
}

const renderCompletedTxt = () => {
    const completedTxt = document.querySelector('.completed__no');
    let completedNo = fetchCompletedNo();
    completedTxt.textContent = `COMPLETED (${completedNo})`;
}

const renderTodos = todos => {
    todos.forEach(todo => {
        renderTodoUI(todo);
    })
}

const renderCompleted = completed => {
    completed.forEach(item => {
        renderCompletedUI(item);
    })
}

const createTodo = name => {
    let todos = fetchTodos();
    todos.push(name);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodoUI(name);
}

const createCompleted = name => {
    let completed = fetchCompleted();
    completed.push(name);
    localStorage.setItem('completed', JSON.stringify(completed));
    renderCompletedUI(name);
}

const clearCompleted = () => {
    const lis = document.querySelectorAll('.completed__list li');
    lis.forEach(li => li.remove());
}

const setupEventListeners = () => {
    const button = document.querySelector('button');
    const input = document.querySelector('input');
    const completedClear = document.querySelector('.completed__clear');
    button.addEventListener('click', () => {
        if (input.value) {
            createTodo(input.value);
            input.value = '';
        };
    })
    completedClear.addEventListener('click', () => {
        localStorage.removeItem('completed');
        clearCompleted();
        renderCompletedTxt();
    })
    input.addEventListener('keypress', e => {
        if (e.code == 'Enter') {
            createTodo(input.value);
            input.value = '';
        }
    })
}

const main = () => {
    setupEventListeners();
    renderTodos(fetchTodos());
    renderCompleted(fetchCompleted());
    renderCompletedTxt();
}

main();