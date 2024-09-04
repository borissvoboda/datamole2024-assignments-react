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
    },
});

export const selectTodos = (state: RootState) => state.todos;

export const { setTodos, addTodo } = todosSlice.actions;

export default todosSlice.reducer;
