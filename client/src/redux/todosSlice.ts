import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface TodoItemType {
    label: string;
    isDone: boolean;
    createdAt: number;
    id: number;
}

export interface TodosState extends Array<TodoItemType> {}

// const initialState: TodosState = [{ label: "hard coded todo", isDone: false, createdAt: 12312321, id: 1222 }];

export const todosSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        setTodos: (state, action: PayloadAction<TodoItemType[]>) => {
            // console.log("Action: ", action);
            // return action.payload;
            return action.payload;
        },
    },
});

export const selectTodos = (state: RootState) => state.todos;

export const { setTodos } = todosSlice.actions;

export default todosSlice.reducer;
