export const createHtml = (todos) => { //funktion som skapar vår HTML
    const myList = document.getElementById("mylist"); //hämtar UL-taggen
    myList.innerHTML = ""; //tömmer UL-taggen på innehåll

    todos.forEach((todo, index) => { //skapar en loop för listan todos

        //skapar elementen
        const checkbox = document.createElement("img"); //skapar img-tagg för checkboxen
        const todoText = document.createElement("p"); //p-tagg
        const remove = document.createElement("div"); //ta bort-div för varje punkt
        const li = document.createElement("li"); //li-tagg

        //ändra elementen
        checkbox.src = "/src/img/unchecked.png"; //sätter bild på checkbox
        checkbox.className = "checkbox"; //get klassnamnet checkbox
        todoText.className = "todo-text"; //lägger till klassnamn för punkterna
        todoText.innerHTML = todo.string; //lägger till innehåll från vår lista i punkten
        remove.className = "remove-button"; //lägger till klassnamn för ta bort-diven
        remove.innerHTML = "&#10005;"; //lägger till X-symbol i ta bort-diven
        li.className = "myli"; //lägger klassnamn på li-tagg
        
        //om vi klickar på en to do, lägg till klassen som gör texten överstruken
        if (todo.done) {
            todoText.classList.add("done"); //klassen done läggs till på punkten
            checkbox.src ="/src/img/checked.png";
        }

        //när du klickar på todo-texten, växla done-status och spara
        todoText.addEventListener("click", () => { //vi klickar på en to do
            todo.done = !todo.done; //to do's done-egenskap ändras från false till true
            localStorage.setItem("todos", JSON.stringify(todos)); //sparar listan i localStorage
            createHtml(todos); //skriver om listan med uppdaterad status
        });

        // klick på remove -> ta bort aktuell todo
        remove.addEventListener("click", () => { //vi klickar på en remove-div
            todos.splice(index, 1); //to do'n tas bort från arrayen
            localStorage.setItem("todos", JSON.stringify(todos)); //sparar listan i localStorage
            createHtml(todos); //skriver om listan med uppdaterad status
        });


        localStorage.setItem("todos", JSON.stringify(todos)); //sparar listan i localStorage

        //lägger elementen i DOM
        li.appendChild(checkbox); //lägger till checkboxen i li-taggen
        li.appendChild(todoText); //lägger p-tagg i li-taggen
        li.appendChild(remove); //lägger remove-diven i li-taggen
        myList.appendChild(li); //lägger li i ul-taggen
    });
};