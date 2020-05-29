export interface Todo {
    id?: string;
    title: string;
    status: TodoStatus;
    description?: string;
}

export enum TodoStatus {
    DO,
    DOING,
    DONE,
}
