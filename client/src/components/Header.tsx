import { PlusIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form } from "./form";
const apiUrl = import.meta.env.VITE_API_URL;

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
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const onItemAdd = (label: string) => {};

    const toggleFormVisibility = () => {
        setIsFormVisible((prev) => !prev);
    };

    const onCreateItem = (inputValue) => {
        console.log("Submit");
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label: inputValue, isDone: false }),
        };
        fetch(`${apiUrl}/items`, requestOptions).then((response) => response.json());
        // .then(data => this.setState({ postId: data.id }));

        // setInputValue("");
    };

    return (
        <StyledDiv>
            <h1>{children}</h1>
            <button onClick={toggleFormVisibility}>
                <PlusIcon />
            </button>
            {isFormVisible ? <Form onSubmit={onCreateItem} /> : ""}
        </StyledDiv>
    );
};
