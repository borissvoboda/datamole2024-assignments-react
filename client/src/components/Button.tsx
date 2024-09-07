import { CheckIcon, Cross1Icon, PlusCircledIcon } from "@radix-ui/react-icons";
// import { PlusCircledIcon } from "@radix-ui/react-icons";
import styled from "styled-components";

const ButtonStyled = styled.button<{ type: string | undefined }>`
    display: flex;
    align-items: center;
    justify-content: center;
`;

type ButtonProps = {
    children: React.ReactNode;
    onClickHandler?: () => void;
    type?: string | undefined;
    disabled?: boolean | undefined;
};

export const Button = (props: ButtonProps) => {
    const { children, onClickHandler, type, disabled } = props;

    return (
        <ButtonStyled onClick={onClickHandler} type={type} disabled={disabled}>
            {children}
        </ButtonStyled>
    );
};
