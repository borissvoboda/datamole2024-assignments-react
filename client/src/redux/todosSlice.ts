import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface TodoItemType {
    label: string;
    isDone: boolean;
    createdAt: number;
    id: number;
}

export interface TodosState extends Array<TodoItemType> {}

export const todosSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        setTodos: (state, action: PayloadAction<TodoItemType[]>) => {
            return action.payload;
        },
        addTodo: (state, action: PayloadAction<TodoItemType>) => {
            state.unshift(action.payload);
        },
        editTodo: (state, action: PayloadAction<TodoItemType>) => {
            const todo = state.find((item) => item.id === action.payload.id);
            if (todo) {
                todo.label = action.payload.label;
            }
        },
        completeTodo: (state, action: PayloadAction<TodoItemType>) => {
            const todo = state.find((item) => item.id === action.payload.id);
            if (todo) {
                todo.isDone = action.payload.isDone;
            }
        },
    },
});

export const selectTodos = (state: RootState) => state.todos;

export const { setTodos, addTodo, editTodo, completeTodo } = todosSlice.actions;

export default todosSlice.reducer;
