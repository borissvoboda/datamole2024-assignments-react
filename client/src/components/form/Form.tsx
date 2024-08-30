import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled from "styled-components";
const apiUrl = import.meta.env.VITE_API_URL;

import { Input } from "./Input";

const FormStyled = styled.form`
    display: flex;
`;

type FormProps = {
    initialValue: string;
    onSubmit: (value: string) => void;
    onCancel: () => void;
};

export const Form = (props: FormProps) => {
    const { initialValue, onSubmit, onCancel } = props;

    const [inputValue, setInputValue] = useState(initialValue);

    console.log(inputValue);

    let isNotEmpty = true;

    if (!inputValue) {
        isNotEmpty = true;
    } else {
        isNotEmpty = false;
    }

    return (
        <FormStyled
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(inputValue);
            }}
            onReset={() => {
                onCancel();
            }}
        >
            <Input value={inputValue} onValueChange={(value) => setInputValue(value)} />
            <button type={"submit"} disabled={isNotEmpty}>
                <CheckIcon />
            </button>
            <button type={"reset"}>
                <Cross1Icon />
            </button>
        </FormStyled>
    );
};
