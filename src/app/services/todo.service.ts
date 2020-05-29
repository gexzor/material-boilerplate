import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Todo } from '../models/Todo';
@Injectable({
    providedIn: 'root'
})

export class TodoService {
    private todoCollection: AngularFirestoreCollection<Todo>;
    private todos: Observable<Todo[]>;

    // Initialize the firebase collection object
    constructor(private afs: AngularFirestore) {
        this.todoCollection = this.afs.collection('todos');
    }


    /**
     * Retrieves all todos from the database.
     */
    public getTodos(): Observable<Todo[]> {
        return this.todos || this.initTodos();
    }


    /**
     * Retrieves a single todos by the given id.
     */
    public getTodo(id: string): Observable<Todo> {

        if (this.todos) {
            console.log(this.todos.pipe(
                map((todos: Todo[]) => todos.find((todo: Todo) => todo.id === id))));

            return this.todos.pipe(
                map((todos: Todo[]) => todos.find((todo: Todo) => todo.id === id)));
        }

        else {
            this.initTodos();
            this.getTodo(id);
        }
    }


    /**
     * Creates a new todo.
     * @param `Todo` The todo which is being created.
     */
    public createTodo(todo: Todo): void {
        this.afs.collection('todos').add(todo);
    }

    /**
     * Updates a todo with given changes.
     * @param `Todo` A copy of the todo, which should replace the current.
     */
    public updateTodo(todo: Todo): void {
        console.log(todo.status);
        this.afs.collection('todos')
            .doc(todo.id)
            .update(todo);
    }

    /**
     * Deletes a the provided todo from the database.
     * @param `POST` The todo which is being deleted.
     */
    deleteTodo(todo: Todo): void {
        this.afs.collection('todos').doc(todo.id).delete();
    }

    /**
     * Initialize the Todo observable list and return it
     * @returns The todo observable list
     */
    private initTodos(): Observable<Todo[]> {
        // Set the observable list to a custom mapping to the firebase snapshot changes
        this.todos = this.todoCollection.snapshotChanges().pipe(
            map((changes: DocumentChangeAction<Todo>[]) => {
                return changes.map((changeAction: DocumentChangeAction<Todo>) => {
                    // Map each changed item to a todo object and set the id as well
                    const todo = changeAction.payload.doc.data() as Todo;
                    todo.id = changeAction.payload.doc.id;
                    return todo;
                });
            }),
        );
        // Return the observable list
        return this.todos;
    }

}