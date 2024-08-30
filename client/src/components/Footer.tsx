import React from "react";
import styled from "styled-components";

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
    const { todoItems, doneItems } = props;

    return (
        <FooterStyled>
            <ItemStyled>Todo: {todoItems || 0}</ItemStyled>
            <ItemStyled>Done: {doneItems || 0}</ItemStyled>
        </FooterStyled>
    );
};
