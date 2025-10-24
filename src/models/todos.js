export class Todo { //class för att skapa en todo-text
  string;
  done; 

  constructor(string, done = false) { //done är per default false, när den ändras till true är to do'n överstruken
    this.string = string;
    this.done = done;
  }
}