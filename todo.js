const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click' , filterTodo); 
function addTodo(e) {
    e.preventDefault();

var inputValue = todoInput.value;
if (inputValue === "") {
    alert("Please Enter a TODO");
    return false;
} else {

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo)
 
    const checkButton = document.createElement('button');
    checkButton.classList.add("check-btn");
    checkButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>'
    todoDiv.appendChild(checkButton);

    saveLocalTodos(todoInput.value);

    const trashButton = document.createElement('button');
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}
}

function deleteCheck(e){
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;

        todo.classList.add("fall")
        removeLocal(todo)

        todo.addEventListener('transitionend', function(){
             todo.remove();  
        })
    }

    if (item.classList[0] === "check-btn") {
        const todo = item.parentElement;
      todo.classList.toggle("checked");  
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){

            case "all":
            todo.style.display = 'flex';
            break;

            case "completed":
            if (todo.classList.contains('checked')) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
            break;

            case "uncompleted":
            if (!todo.classList.contains('checked')) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
            break;
        }
    });
}
 
function saveLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}
 
function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

   todos.forEach(function(todo){
       
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo)
 
    const checkButton = document.createElement('button');
    checkButton.classList.add("check-btn");
    checkButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>'
    todoDiv.appendChild(checkButton);

    const trashButton = document.createElement('button');
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
   })
}
function removeLocal(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos" , JSON.stringify(todos));
}