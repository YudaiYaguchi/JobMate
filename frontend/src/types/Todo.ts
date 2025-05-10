export type TodoPriority = "通常" | "優先" | "緊急";

export type Todo = {
    id: number
    title: string
    date: string
    is_done: boolean
    priority: TodoPriority
    user_id: number;
    created_at: string;
    updated_at: string;
}

export type InputTodo = {
    title: string
    date: string
    is_done: boolean
    priority: TodoPriority
}