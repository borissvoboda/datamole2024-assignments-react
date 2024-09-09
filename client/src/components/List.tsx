import { useEffect, useState } from "react";
import styled from "styled-components";
import { ListItem } from "./ListItem";
import { selectTodos, setTodos, deleteTodo } from "../redux/todosSlice";
import { useAppSelector, useAppDispatch } from ".././redux/hooks";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export type ListItemType = {
    label: string;
    isDone: boolean;
    createdAt: number;
    id: number;
};

export const List = () => {
    const [items, setItems] = useState<ListItemType[]>([]);
    const [error, setError] = useState<any>();

    const dispatch = useAppDispatch();

    const todos = useAppSelector(selectTodos);

    useEffect(() => {
        fetch(`${apiUrl}/items`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                dispatch(setTodos(data.sort((a: ListItemType, b: ListItemType) => b.createdAt - a.createdAt)));
            });
    }, []);

    const onItemDelete = (id: number) => {
        axios
            .delete(`${apiUrl}/items/${id}`)
            .then((response) => {
                dispatch(deleteTodo(id));
            })
            .catch((error) => console.error(error));
    };

    // TODO:
    const func = () => {};

    let doneItems: ListItemType | [] = [];
    let todoItems: ListItemType | [] = [];

    if (todos) {
        todos.filter((item) => {
            if (item.isDone == true) {
                doneItems.push(item);
            } else {
                todoItems.push(item);
            }
        });
    }

    const mapper = (arr: ListItemType[]) => {
        return arr.map((item) => (
            <ListItem
                key={`${item.id}_${item.createdAt}`}
                id={item.id}
                label={item.label}
                isDone={item.isDone}
                onItemLabelEdit={func}
                onItemDoneToggle={func}
                onItemDelete={onItemDelete}
            />
        ));
    };

    return (
        <StyledDiv>
            {todoItems.length > 0 ? mapper(todoItems) : <div>No todo items available</div>}
            {doneItems.length > 0 ? mapper(doneItems) : <div>No done items available</div>}
        </StyledDiv>
    );
};
