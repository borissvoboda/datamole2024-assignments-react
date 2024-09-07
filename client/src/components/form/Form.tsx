import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../Button";

const apiUrl = import.meta.env.VITE_API_URL;

import { Input } from "./Input";

const FormStyled = styled.form`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const ButtonContainer = styled.div`
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
                setInputValue("");
            }}
            onReset={() => {
                onCancel();
            }}
        >
            <Input value={inputValue} onValueChange={(value) => setInputValue(value)} />
            <ButtonContainer>
                <Button type="submit" disabled={isNotEmpty}>
                    <CheckIcon />
                </Button>

                <Button type="reset">
                    <Cross1Icon />
                </Button>
            </ButtonContainer>
        </FormStyled>
    );
};
