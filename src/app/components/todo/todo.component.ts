import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Todo, TodoStatus } from 'src/app/models/Todo';
import { SnackbarColor, SnackbarService } from 'src/app/services/snackbar.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {

    @ViewChild('formGroupDirective', { static: false }) formGroupDirective: FormGroupDirective;
    public statusType: typeof TodoStatus = TodoStatus;
    public colorType: typeof SnackbarColor = SnackbarColor;
    public selectedTodo: Todo;
    public todos$: Observable<Todo[]>;
    public filteredTodos$: Observable<Todo[]>;
    public todoForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });

    constructor(
        public snackbarService: SnackbarService,
        private todoService: TodoService,
    ) { }

    ngOnInit() {
        this.todos$ = this.todoService.getTodos();
        this.filteredTodos$ = this.todoForm.controls.title.valueChanges.pipe(
            startWith(''),
            map((value: string) => this.filterTodos(value)),
        );
    }

    /**
     * Clears the todo form and resets the validation.
     */
    public clearForm(): void {
        this.todoForm.reset();
        this.formGroupDirective.resetForm();
    }

    /**
     * Adds a new todo.
     * @param title The title of the todo.
     */
    public addTodo(input: string): void {
        const newTodo: Todo = {
            title: input,
            status: 0,
        };
        this.todoService.createTodo(newTodo);
        this.clearForm();
    }

    /**
     * Updates the todo and displays snackbar message in the bottom of the screen
     * @param todo The todo which status is being updated.
     */
    public updateTodo(todo: Todo): void {
        let snackMessage: string;
        let snackBarColor: SnackbarColor;

        todo.status === TodoStatus.DO ? snackMessage = 'NOT DONE' :
            todo.status === TodoStatus.DOING ? snackMessage = 'DOING' :
                snackMessage = 'DONE';

        todo.status === TodoStatus.DO ? snackBarColor = this.colorType.info :
            todo.status === TodoStatus.DOING ? snackBarColor = this.colorType.primary :
                snackBarColor = this.colorType.success;

        this.todoService.updateTodo(todo);
        this.snackbarService.displaySnack(snackMessage, snackBarColor, 2000);
    }

    /**
     * Deletes the todo.
     * @param title The todo which is being deleted.
     * @param event The event which triggered the function.
     */
    public deleteTodo(todo: Todo, event: Event): void {
        event.stopPropagation();
        this.todoService.deleteTodo(todo);
    }

    /**
     * Cycles the status of the clicked todo.
     * @param todo The todo which is being deleted.
     */
    public switchStatus(todo: Todo): void {
        todo.status === TodoStatus.DO ? todo.status = TodoStatus.DOING :
            todo.status === TodoStatus.DOING ? todo.status = TodoStatus.DONE :
                todo.status = TodoStatus.DO;
    }


    /**
     * Filters the list of todos by description via the provided text input.
     * @param value The text value provided by the user.
     */
    public filterTodos(value: string): Todo[] {
        const filterValue = this._normalizeValue(value);
        // return this.todos$.pipe(
        //     map((todos: Todo[]) => todos.filter((todo: Todo[]) => this._normalizeValue(todo.title).includes(filterValue))
        // )

        return;
    }

    /**
     * Normalize string value.
     * @param value The string being normalized.
     */
    private _normalizeValue(value: string): string {
        return value.toLowerCase().replace(/\s/g, '');
    }
}
