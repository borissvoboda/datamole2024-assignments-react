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
    const [createdItem, setCreatedItem] = useState<any>({});
    const [error, setError] = useState<any>({});

    const onItemAdd = (label: string) => {};

    const toggleFormVisibility = () => {
        setIsFormVisible((prev) => !prev);
    };

    const onCreateItem = async (inputValue) => {
        try {
            const response = await fetch(`${apiUrl}/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    label: inputValue,
                    isDone: false,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setCreatedItem(data);
            } else {
                setError(`Error: ${response.status} ${response.statusText}`);
            }
        } catch (err) {
            setError(`Network Error: ${err.message}`);
        }
    };

    console.log(createdItem);

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
