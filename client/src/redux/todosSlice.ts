import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface TodoItemType {
    label: string;
    isDone: boolean;
    createdAt: number;
    id: number;
}

export interface TodosState extends Array<TodoItemType> {}

const initialState: TodosState = [{ label: "hard coded todo", isDone: false, createdAt: 12312321, id: 1222 }];

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state) => {
            state.push;
        },
    },
});

export const selectTodos = (state: RootState) => state.todos;

export default todosSlice.reducer;
