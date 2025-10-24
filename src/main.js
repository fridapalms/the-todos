import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Todo } from './models/todos';
import { createHtml } from './utilities';
import "./scss/style.scss";



let todos = [];      //listan som vi börjar med, den uppdateras av localStorage    

const todosFromLs = localStorage.getItem("todos"); //hämtar listan todos från localStorage och lägger i en variabel

if (todosFromLs !== null) { //om listan i localStorage inte är tom
  todos = JSON.parse(todosFromLs); //ska todos-listan ersättas med listan från localStorage
} else {
    todos = [    //placeholder listan
        new Todo("Testrad 1", false), //rad1
        new Todo("Testrad 2", false) //rad2
    ];   

    localStorage.setItem("todos", JSON.stringify(todos));
}

const handleSubmit = (e) => { //när man klickar på submit-knappen
  e.preventDefault(); //avbryter submits standardfunktioner

  const todo = document.getElementById("todo").value; //hämtar värdet från textfältet

  if (!todo) { //om textfältet ej är ifyllt
    alert("Du måste skriva något i rutan"); //popup fönster som varnar användaren
    return;
  }

  const newTodo = new Todo(todo, false); //skapar en ny text med hjälp av classen
  todos.push(newTodo); //lägger till texten i listan todos
  localStorage.setItem("todos", JSON.stringify(todos)); //uppdaterar listan i localStorage

  document.getElementById("todo").value = ""; //tömmer inputfältet

  //skapa html för listan
  createHtml(todos);
}

//hitta formuläret
const todoForm = document.getElementById("myform");
if (todoForm) { //om formuläret hittas
  todoForm.addEventListener("submit", handleSubmit); //lyssna efter klick på submitknappen, kör då handleSubmit
}

createHtml(todos); //skapa html för listan