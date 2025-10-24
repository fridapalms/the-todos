import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Todo } from './models/todos';
import { createHtml } from './utilities';
import "./style.scss";



let todos = [          //listan som vi börjar med, den uppdateras av localStorage
    new Todo("Skapa en todo-lista", false),
    new Todo("Bocka av punkterna på listan", false)
]; 

localStorage.setItem("todos", JSON.stringify(todos));
const todosFromLs = localStorage.getItem("todos"); //hämtar listan todos från localStorage

if (todosFromLs !== null) { //om listan i localStorage inte är tom
  todos = JSON.parse(todosFromLs); //ska todos-listan ersättas med listan från localStorage
}

const handleSubmit = (e) => { //när man klickar på submit-knappen
  e.preventDefault(); //avbryter submits standardfunktioner

  const todo = document.getElementById("todo").value; //hämtar värdet från textfältet

  if (!todo) { //om textfältet ej är ifyllt
    alert("Du måste skriva något i rutan"); //popup fönster som varnar användaren
    return;
  }

  const newTodo = new Todo(todo); //skapar en ny text med hjälp av classen
  todos.push(newTodo); //lägger till texten i listan todos
  localStorage.setItem("todos", JSON.stringify(todos)); //uppdaterar listan i localStorage

  document.getElementById("todo").value = ""; //tömmer inputfältet

  //skapa html för listan
  createHtml(todos);
}

//hitta formuläret
const todoForm = document.getElementById("todo-form");
if (todoForm) {
  todoForm.addEventListener("submit", handleSubmit);
}

createHtml(todos); //skapa html för listan