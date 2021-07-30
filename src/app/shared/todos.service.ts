import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { delay } from "rxjs/operators";

export interface Todo {
    id:number
    title:string
    completed:boolean
    date?: any
}

@Injectable({providedIn: 'root'})
export class TodosService {
    public todos: Todo[] = [];

    constructor(private http: HttpClient){}

    fetchTodos(): Observable<Todo[]>{
      return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=7 ')
        .pipe(delay(2000))
        .pipe(tap(todos=>{
          this.todos = todos
          console.log('todos',todos)
        }
          
          ))
    }


      onToggle(id:number): void{
        const index = this.todos.findIndex(t=> t.id === id)
        this.todos[index].completed = !this.todos[index].completed
      }
      removeTodo(id: number): void {
        this.todos = this.todos.filter(t=>t.id!== id)
      } 

      addTodo(todo: Todo ) {
         this.todos.push(todo)
      }

}