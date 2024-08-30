import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import styled from "styled-components";

const StyledDiv = styled.header`
    display: flex;

    button {
        all: unset;

        width: 25px;
        height: 25px;

        background-color: ${(props) => props.theme.colors.grass9};
        border: 1px solid;
        border-color: ${(props) => props.theme.colors.olive9};
        border-radius: 50%;

        color: #fff;
    }
`;

type HeaderProps = {
    children: React.ReactNode;
    onItemAdd: (label: string) => void;
};

export const Header = (props: HeaderProps) => {
    const { children } = props;

    return (
        <StyledDiv>
            <h1>{children}</h1>
            <button>
                <PlusIcon />
            </button>
        </StyledDiv>
    );
};
