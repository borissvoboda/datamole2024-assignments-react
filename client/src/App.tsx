import { useState } from "react";
import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { ListItemType } from "./components/List";

export const App = () => {
    const handleItemAdd = (newItem: ListItemType) => {
        // setNewItem(newItem);
    };

    return (
        <ThemeProvider>
            <Container>
                <Layout>
                    <Header onItemAdd={handleItemAdd}>To Do app</Header>
                    <List />
                    <Footer />
                </Layout>
            </Container>
        </ThemeProvider>
    );
};
