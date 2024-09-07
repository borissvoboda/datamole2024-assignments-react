import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Checkbox } from "./Checkbox";
import { Form } from "./form";
import { Button } from "./Button";

import { editTodo, completeTodo } from "../redux/todosSlice";
import { useAppDispatch } from ".././redux/hooks";

const apiUrl = import.meta.env.VITE_API_URL;

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
`;

const StaticContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const ButtonContainer = styled.div`
    display: flex;
    visibility: hidden;

    ${StaticContainer}:hover & {
        visibility: visible;
    }
`;

const Label = styled.label`
    margin-left: 15px;
`;

const EditContainer = styled.div`
    display: flex;
    margin-left: 15px;
    justify-content: space-between;
    width: 100%;
`;

export type LiteeItemProp = {
    id: number;
    label: string;
    isDone: boolean;
    onItemLabelEdit: (label: string) => void;
    onItemDoneToggle: (isDone: boolean) => void;
    onItemDelete: (id: number) => void;
};

export const ListItem = (props: LiteeItemProp) => {
    const { id, label, onItemLabelEdit, onItemDoneToggle, onItemDelete } = props;
    const [editMode, setEditMode] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(props.isDone);
    const [dynamicLabel, setDynamicLabel] = useState<string>(props.label);

    const dispatch = useAppDispatch();

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
    };

    const handleChangeLabel = (inputValue: string) => {
        axios
            .patch(`${apiUrl}/items/${id}`, { label: inputValue })
            .then((response) => {
                dispatch(editTodo(response.data));
                setDynamicLabel(response.data.label);
                console.log(response.data);
            })
            .catch((error) => console.error(error));

        setEditMode(false);
    };

    const itemDoneToggle = (e: boolean) => {
        axios
            .patch(`${apiUrl}/items/${id}`, { isDone: e })
            .then((response) => {
                dispatch(completeTodo(response.data));
                setIsDone(e);
                console.log(response.data);
            })
            .catch((error) => console.error(error));
    };

    const StaticMode = () => {
        return (
            <>
                <StaticContainer>
                    <Label>{dynamicLabel}</Label>

                    <ButtonContainer>
                        <Button onClickHandler={() => onItemDelete(id)}>
                            <TrashIcon />
                        </Button>

                        <Button onClickHandler={toggleEditMode}>
                            <Pencil1Icon />
                        </Button>
                    </ButtonContainer>
                </StaticContainer>
            </>
        );
    };

    const EditMode = () => {
        return (
            <EditContainer>
                <Form initialValue={dynamicLabel} onSubmit={handleChangeLabel} onCancel={toggleEditMode} />
            </EditContainer>
        );
    };

    return (
        <StyledDiv>
            <Checkbox
                checked={isDone}
                onCheckedChange={(e) => {
                    itemDoneToggle(!!e);
                }}
            />
            {editMode ? <EditMode /> : <StaticMode />}
        </StyledDiv>
    );
};
