const textarea = document.querySelector('textarea');
const addButton = document.querySelector('#add-button');
const todoContainer = document.querySelector('.todo-container');

let todoList = [];

function initialLoad() {
    if (!localStorage.getItem('todos')) {
        return;
    };
    todoList = JSON.parse(localStorage.getItem('todos')).todoList;
    updateUI();
};

initialLoad();

function addTodo() {
    const todo = textarea.value;
    if (!todo) {
        return;
    };

    console.log('Add todo: ', textarea.value);
    todoList.push(todo);
    textarea.value = ''; //resets to empty
    updateUI();
};

function editTodo(index) {
    textarea.value = todoList[index];
    todoList = todoList.filter((element, elementIndex) => {
        if (index === elementIndex) {
            return false;
        };
        return true;
    });
    updateUI();
};

function deleteTodo(index) {
    todoList = todoList.filter((element, elementIndex) => {
        if (index === elementIndex) {
            return false;
        };
        return true;
    });
    updateUI();
};

function updateUI() {
    let newInnerHTML = '';
    todoList.forEach((todoElement, todoIndex) => {
        newInnerHTML += `
        <div class="todo">
            <p>${todoElement}</p>
                <div class="button-container">
                    <button class="icon-button" onclick="editTodo(${todoIndex})">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button class="icon-button" onclick="deleteTodo(${todoIndex})">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `
    });

    todoContainer.innerHTML = newInnerHTML;

    //to save to local storage
    localStorage.setItem('todos', JSON.stringify({todoList}));
};

addButton.addEventListener('click', addTodo);