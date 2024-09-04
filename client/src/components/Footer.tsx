import React from "react";
import styled from "styled-components";

import { selectTodos } from "../redux/todosSlice";
import { useAppSelector } from ".././redux/hooks";

const FooterStyled = styled.footer`
    display: flex;

    margin-top: 15px;
    padding-top: 15px;

    border-top: 1px solid;
    border-color: ${(props) => props.theme.colors.olive6};
`;

const ItemStyled = styled.div`
    flex: 1;
`;

type FooterProps = {
    todoItems?: number;
    doneItems?: number;
};

export const Footer = (props: FooterProps) => {
    const todos = useAppSelector(selectTodos);

    let doneCounter = 0;
    let todoCounter = 0;

    if (todos) {
        todos.filter((item) => {
            if (item.isDone == true) {
                doneCounter++;
            } else {
                todoCounter++;
            }
        });
    }

    return (
        <FooterStyled>
            <ItemStyled>Todo: {todoCounter}</ItemStyled>
            <ItemStyled>Done: {doneCounter}</ItemStyled>
        </FooterStyled>
    );
};
