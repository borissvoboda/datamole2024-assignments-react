import React, { PropsWithChildren } from "react";
import { olive, grass, blackA, lime } from "@radix-ui/colors";
import { ThemeProvider as ThemeProviderStyled } from "styled-components";

import { GlobalStyle } from "../styles/GlobalStyle";

const theme = {
    colors: {
        ...olive,
        ...grass,
        ...blackA,
        ...lime,
    },
};

export const ThemeProvider = (props: PropsWithChildren) => {
    const { children } = props;

    return (
        <ThemeProviderStyled theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProviderStyled>
    );
};
