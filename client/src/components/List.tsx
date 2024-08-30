import { useEffect, useState } from "react";
import styled from "styled-components";
import { ListItem } from "./ListItem";
const apiUrl = import.meta.env.VITE_API_URL;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

export type ListItemType = {
    label: string;
    isDone: boolean;
    createdAt: number;
    id: number;
};

export const List = () => {
    const [items, setItems] = useState<ListItemType[] | []>();
    const [error, setError] = useState<any>();

    useEffect(() => {
        fetch(`${apiUrl}/items`)
            .then((response) => response.json())
            .then((data) => setItems(data.sort((a: ListItemType, b: ListItemType) => b.createdAt - a.createdAt)));
    }, []);

    const onItemDelete = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/items/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setItems((prevItems) => prevItems.filter((item) => item.id !== id));
            } else {
                setError(`Error: ${response.status} ${response.statusText}`);
            }
        } catch (err) {
            setError(`Network Error: ${err.message}`);
        }
    };

    // TODO:
    const func = () => {};

    let doneItems: ListItemType | [] = [];
    let todoItems: ListItemType | [] = [];

    if (items) {
        items.filter((item) => {
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
