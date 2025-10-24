export const createHtml = (todos) => { //funktion som skapar vår HTML
    const myList = document.getElementById("mylist"); //hämtar UL-taggen
    myList.innerHTML = ""; //tömmer UL-taggen på innehåll
    const divDelete = document.getElementById("divdelete"); //hämtar div för removeknapp

    todos.forEach((todo, index) => { //skapar en loop för listan todos

        //skapar elementen
        const todoText = document.createElement("li"); //punkterna i listan
        const remove = document.createElement("div"); //ta bort-div för varje punkt

        //ändra elementen
        todoText.className = "todo-text"; //lägger till klassnamn för punkterna
        todoText.innerHTML = todo.string; //lägger till innehåll från vår lista i punkten
        remove.className = "remove-button"; //lägger till klassnamn för ta bort-diven
        remove.innerHTML = "&#10005;" //lägger till X-symbol i ta bort-diven
        
        //om vi klickar på en to do, lägg till klassen som gör texten överstruken
        if (todo.done) {
            todoText.classList.add("done"); //klassen done läggs till på punkten
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

        //lägg elementen i DOM
        myList.appendChild(todoText); //lägger LI-taggarna i UL-taggen
        divDelete.appendChild(remove); //lägger remove-diven i UL-taggen
    });
};