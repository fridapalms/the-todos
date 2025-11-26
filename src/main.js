import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Todo } from "./models/todos";
import { createHtml } from "./utilities";
import "./scss/style.scss";
import { normalizeModuleId } from "vite/module-runner";

//-----------------------------------

//SKAPA LISTAN:

let todos = []; //listan som vi börjar med, den uppdateras av localStorage

const todosFromLs = localStorage.getItem("todos"); //hämtar listan todos från localStorage och lägger i en variabel

if (todosFromLs !== null) {
  //om listan i localStorage finns
  todos = JSON.parse(todosFromLs); //ska originallistan ersättas med listan från localStorage
}

if (todos.length === 0) {
  //om längden på listan är 0, dvs inga punkter i listan
  todos = [
    // ersätts listan med placeholder-punkter enligt nedan
    new Todo("Lägg till en punkt i listan", false),
    new Todo("Tryck på punkten när den är avklarad", true), //den här är true för att demonstrera hur avklarade punkter ser ut
    new Todo("Klicka på krysset för att ta bort", false),
  ];
  localStorage.setItem("todos", JSON.stringify(todos)); //sparar listan i localstorage
}

//-----------------------------------

//LÄGGA TILL I LISTAN:

const handleSubmit = (e) => {
  //när man klickar på submit-knappen
  e.preventDefault(); //avbryter submits standardfunktioner

  const todo = document.getElementById("todo").value; //hämtar värdet från textfältet

  if (!todo) {
    //om textfältet ej är ifyllt
    alert("Du måste skriva något i rutan"); //popup fönster som varnar användaren
    return; //avslutar funktionen direkt
  }

  const newTodo = new Todo(todo, false); //skapar en ny text med hjälp av classen
  todos.push(newTodo); //lägger till texten i listan todos
  localStorage.setItem("todos", JSON.stringify(todos)); //uppdaterar listan i localStorage

  document.getElementById("todo").value = ""; //tömmer inputfältet

  createHtml(todos); //skapa html för listan
};

const todoForm = document.getElementById("myform"); //hittar formuläret

if (todoForm) {
  //om formuläret hittas
  todoForm.addEventListener("submit", handleSubmit); //lyssna efter klick på submitknappen, kör då handleSubmit
}

createHtml(todos); //skapa html för den nya listan med tillagd to do

//-----------------------------------

//ÄNDRA ORDNING PÅ LISTAN:

const sort = document.getElementById("sort"); //hämta sorteringsknappen
let reversed = false; //sätter reversed som false som default (uppifrån och ner)

//klicka på sort skiftar ordning i listan
sort.addEventListener("click", () => {
  //lyssnar efter klick på sort-img
  todos.reverse(); //listan ändrar ordning med reverse
  reversed = !reversed; //false blir istället true (nerifrån och upp)

  localStorage.setItem("todos", JSON.stringify(todos)); //sparar listan i localStorage
  localStorage.setItem("reversed", JSON.stringify(reversed)); //sparar ordningen i localStorage, gör en string av boolean true/false

  if (reversed) {
    //om listan är reversed (true) (nerifrån och upp)
    sort.src = "src/img/sort2.png"; //använd denna ikon
  } else {
    //om inte (reverse är false, listan är uppifrån och ner)
    sort.src = "src/img/sort.png"; //använd denna ikon
  }

  createHtml(todos); //skriver om listan med uppdaterad status av ordningen
});

//-----------------------------------

//KONTROLLERA ORDNINGEN PÅ LISTAN SÅ DET ÄR RÄTT VID EN OMLADDNING AV SIDAN:

const orderFromLs = localStorage.getItem("reversed"); //hämtar ordningen från localStorage till en variabel
if (orderFromLs !== null) {
  //kontrollerar att det finns något sparat i localstorage
  reversed = JSON.parse(orderFromLs); //konverterar stringen till en riktig boolean
}

sort.src = reversed ? "src/img/sort2.png" : "src/img/sort.png"; //om reversed är true används första länken, om false används den andra länken
createHtml(todos); //skapa html för listan i den rätta ordningen

//-----------------------------------
