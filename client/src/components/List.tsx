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
    createdAt: string;
    id: string;
};

export const List = () => {
    const [items, setItems] = useState<ListItemType[]>();

    useEffect(() => {
        fetch(`${apiUrl}/items`)
            .then((response) => response.json())
            .then((data) => setItems(data));
    }, []);

    // TODO:
    const func = () => {};

    return (
        <StyledDiv>
            {items ? (
                items.map((item) => (
                    <ListItem
                        key={`${item.id}_${item.createdAt}`}
                        id={`${item.id}_${item.createdAt}`}
                        label={item.label}
                        isDone={item.isDone}
                        onItemLabelEdit={func}
                        onItemDoneToggle={func}
                        onItemDelete={func}
                    />
                ))
            ) : (
                <div>No items available</div>
            )}
        </StyledDiv>
    );
};
